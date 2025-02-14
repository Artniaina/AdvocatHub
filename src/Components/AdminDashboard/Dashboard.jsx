import React from "react";
import SideBar from "./SideBar";
import UserListManagement from './UserListManagement'

const Dashboard = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        {/* <SideBar /> */}
        <UserListManagement />
      </div>
    </>
  );
};

export default Dashboard;
