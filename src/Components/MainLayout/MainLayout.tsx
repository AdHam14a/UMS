import SideBar from "./Sidebar/SideBar";
import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <div className="d-flex">
        <div>
          <SideBar />
        </div>
        <div className="w-100">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
