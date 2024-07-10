import React, { useRef, useEffect, useState } from "react";
import { SlClose } from "react-icons/sl";

const PopUpActiPref = ({
  onClose,
  onSubmit,
  value,
  activity,
  defaultActivity,
  defaultValue
}) => {
  console.log(defaultValue);
  const overlayRef = useRef(null);
  const [sortedActivities, setSortedActivities] = useState([...activity]);
  const [sortOrder, setSortOrder] = useState("az");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivities, setSelectedActivities] = useState(defaultActivity);
  
  console.log(value.code);

  useEffect(() => {
    if (value.length > 0) {
      setSelectedActivities(value);
    }
  }, [value]);
  
  const sortActivities = () => {
    const newSortOrder = sortOrder === "az" ? "za" : "az";
    setSortOrder(newSortOrder);

    const sorted = [...sortedActivities].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return newSortOrder === "az"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setSortedActivities(sorted);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCheckboxChange = (code) => {
    setSelectedActivities((prevSelectedActivities) =>
      prevSelectedActivities.includes(code)
        ? prevSelectedActivities.filter((act) => act !== code)
        : [...prevSelectedActivities, code]
    );
  };

  const filteredActivities = sortedActivities.filter((activity) => {
    const activityName = activity.name.toLowerCase();
    return activityName.includes(searchQuery);
  });

  const handleSubmit = () => {
    onSubmit(selectedActivities);
    onClose();
  };  
  const toggleSortOrder = () => {
    sortActivities();
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={overlayRef}>
        <div className="head">
          <button className="closebtn" onClick={onClose}>
            <SlClose />
          </button>
        </div>
        <div className="table-container">
          <input
            type="text"
            placeholder="Recherche"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>
                  <button className="theadbtn" onClick={toggleSortOrder}>
                    {sortOrder === "az" ? "Activité ▲" : "Activité ▼"}
                  </button>
                </th>
                <th>Choix</th>
              </tr>
            </thead>
            <tbody>
            {filteredActivities.map((activity) => (
                <tr key={activity.code}>
                  <td>{activity.code}</td>
                  <td>{activity.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={activity.code}
                      checked={selectedActivities.includes(activity.code)}
                      onChange={() => handleCheckboxChange(activity.code)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="buttonPop" onClick={handleSubmit}>
          Valider
        </button>
      </div>
    </div>
  );
};

export default PopUpActiPref;
