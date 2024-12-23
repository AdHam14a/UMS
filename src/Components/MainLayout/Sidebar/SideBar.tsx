import { IoMdHome } from 'react-icons/io';
import { IoPersonAdd } from 'react-icons/io5';
import { PiUsersThreeFill } from 'react-icons/pi';
import { RiLogoutCircleLine, RiProfileFill } from 'react-icons/ri';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import profile from "../../../assets/Images/profile.png"
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { PageContext } from '../../context/PageContext';

export default function SideBar() {
  let [collapsed, setCollapsed] = useState(false);
  let { userData } = useContext(PageContext);
  let navigate = useNavigate();
  let logout = () => {
    navigate("/login");
  }

  let toggle = () => {
    setCollapsed(!collapsed);
  }

  let { changeAddPage } = useContext(PageContext);

  let addUsersection = () => {
    changeAddPage(0);
  }
  return (
    <>
      <div className='sidebarContainer vh-100'>
        <Sidebar collapsed={collapsed} className='vh-100'>
          <div className='d-flex justify-content-center align-items-center mt-3'>
            {collapsed ?
              <FaArrowCircleRight onClick={toggle} size={27} className='cursor-pointer' /> :
              <FaArrowCircleLeft onClick={toggle} size={27} className='cursor-pointer' />
            }
          </div>
          <div className='text-center mt-3'>
            <img src={userData?.image} alt='profile' className='rounded-circle w-50'/>
            <h6 className='mt-2'>{userData?.firstName} {userData?.lastName}</h6>
            <h6 className='text-warning'>Admin</h6>
          </div>
          <Menu>
            <MenuItem icon={<IoMdHome />} component={<Link to="" />}>Home</MenuItem>
            <MenuItem icon={<PiUsersThreeFill />} component={<Link to="users" />}>Users</MenuItem>
            <MenuItem onClick={addUsersection} icon={<IoPersonAdd />} component={<Link to="add-user" />}>Add User</MenuItem>
            <MenuItem icon={<RiProfileFill />} component={<Link to="profile" />}>Profile</MenuItem>
            <MenuItem onClick={logout} icon={<RiLogoutCircleLine />} component={<Link to="" />}>Logout</MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  )
}





