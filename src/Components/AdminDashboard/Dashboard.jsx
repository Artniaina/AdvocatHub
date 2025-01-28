import React from "react";
import SideBar from "./SideBar";
import UserList from "./UserList";

const Dashboard = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />
        <UserList />
      </div>
    </>
  );
};

export default Dashboard;
