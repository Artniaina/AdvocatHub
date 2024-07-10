import React, { useRef, useEffect, useState } from "react";
import { SlClose } from "react-icons/sl";

const PopUpActiPref = ({ onClose, onSubmit, value, activity, defaultActivity }) => {
  const overlayRef = useRef(null);
  const [sortedActivities, setSortedActivities] = useState([...activity]);
  const [sortOrder, setSortOrder] = useState("az");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivities, setSelectedActivities] = useState(value || []);

  console.log(defaultActivity);
  useEffect(() => {
    setSelectedActivities(value);
  }, [value]);

  const sortActivities = () => {
    const newSortOrder = sortOrder === "az" ? "za" : "az";
    setSortOrder(newSortOrder);

    const sorted = [...sortedActivities].sort((a, b) => {
      const nameA = a.name.toUpperCase(); 
      const nameB = b.name.toUpperCase(); 
      return newSortOrder === "az" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setSortedActivities(sorted);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCheckboxChange = (activity) => {
    setSelectedActivities((prevSelectedActivities) =>
      prevSelectedActivities.includes(activity)
        ? prevSelectedActivities.filter((act) => act !== activity)
        : [...prevSelectedActivities, activity]
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
    <div className="popup-overlay" ref={overlayRef}>
      <div className="popup-content">
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
                <th className="theadbtn">Choix</th>
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
                      value={activity}
                      checked={selectedActivities.includes(activity)}
                      onChange={() => handleCheckboxChange(activity)}
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
