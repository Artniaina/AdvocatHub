import React, { useRef, useEffect, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";

const PopUpActiPref = ({
  onClose,
  onSubmit,
  value,
  activity,
  defaultActivity,
}) => {
  const overlayRef = useRef(null);
  const [sortedActivities, setSortedActivities] = useState([...activity]);
  const [sortOrder, setSortOrder] = useState("az");
  const [searchQueryCode, setSearchQueryCode] = useState("");
  const [searchQueryActivity, setSearchQueryActivity] = useState("");
  const [searchType, setSearchType] = useState("");

  const [selectedActivities, setSelectedActivities] = useState(defaultActivity);

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
        ? nameA.localeCompare(nameB, undefined, { numeric: true })
        : nameB.localeCompare(nameA, undefined, { numeric: true });
    });
    setSortedActivities(sorted);
  };

  const handleSearchCodeChange = (e) => {
    setSearchQueryCode(e.target.value);
  };

  const handleSearchActivitésChange = (e) => {
    setSearchQueryActivity(e.target.value);
  };

  const toggleSearchInput = (type) => {
    setSearchType(type);
    if (type === "code") {
      setSearchQueryActivity("");
    } else if (type === "activity") {
      setSearchQueryCode("activity");
    }
  };

  const handleCheckboxChange = (code) => {
    setSelectedActivities((prevSelectedActivities) =>
      prevSelectedActivities.includes(code)
        ? prevSelectedActivities.filter((act) => act !== code)
        : [...prevSelectedActivities, code]
    );
  };

  const filteredActivities = sortedActivities.filter((activity) => {
    const codeMatches = activity.code.toLowerCase().includes(searchQueryCode.toLowerCase());
    const activityMatches = activity.name.toLowerCase().includes(searchQueryActivity.toLowerCase());
    return searchType === "code" ? codeMatches : activityMatches;
  });

  const handleSubmit = () => {
    onSubmit(selectedActivities);
    onClose();
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
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  {searchType === "code" ? (
                    <input
                      type="text"
                      placeholder="Code"
                      value={searchQueryCode}
                      onChange={handleSearchCodeChange}
                    />
                  ) : (
                    <>
                      <button onClick={() => toggleSearchInput("code")}>
                        <AiOutlineSearch />
                      </button>
                      <button className="theadbtn" onClick={sortActivities}>
                        {sortOrder === "az" ? "Code ▲" : "Code ▼"}
                      </button>
                    </>
                  )}
                </th>
                <th>
                  {searchType === "activity" ? (
                    <input
                      type="text"
                      placeholder="activités"
                      value={searchQueryActivity}
                      onChange={handleSearchActivitésChange}
                    />
                  ) : (
                    <>
                      <button onClick={() => toggleSearchInput("activity")}>
                        <AiOutlineSearch />
                      </button>
                      <button className="theadbtn" onClick={sortActivities}>
                        {sortOrder === "az" ? "Activité ▲" : "Activité ▼"}
                      </button>
                    </>
                  )}
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
