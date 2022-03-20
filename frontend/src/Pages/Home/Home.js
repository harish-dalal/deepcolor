import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../../Components/Navigation/NavigationBar";

function Home() {
  return (
    <div>
      <NavigationBar />
      <div style={{ marginTop: "40px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
