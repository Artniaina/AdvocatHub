import React from "react";
import SideBar from "./SideBar";

const AvocatList = () => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <SideBar />
      </div>
      <div>
        <div>Contenu Liste des avocats</div>
      </div>
    </div>
  );
};

export default AvocatList;
