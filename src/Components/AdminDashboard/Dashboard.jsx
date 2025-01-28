import React from "react";
import Sidebar from "./SideBar";
import UserList from "./UserList";

const Dashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <UserList />
    </div>
  );
};

export default Dashboard;
