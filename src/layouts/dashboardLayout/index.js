import React, { useEffect, useState } from 'react';
import TopNav from '../../components/dashboardComponents/TopNav.jsx';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/dashboardComponents/SideBar';
import { useSocket } from '../../hooks/SocketContext.jsx';


const DashboardLayout = () => {


  const [open, setOpen] = useState(false);
  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full flex relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-secondary overflow-y-auto transition-transform duration-500 ease-in-out z-50
        ${open ? 'translate-x-0' : '-translate-x-full'}
        w-[85%] md:w-[50%] lg:w-[18%] lg:translate-x-0`}
      >
        <SideBar handleClick={handleToggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="w-full lg:w-[82%] lg:ml-[18%]">
        {/* Top Navigation */}
        <div className="fixed w-full z-40">
          <TopNav handleClick={handleToggleSidebar} />
        </div>

        {/* Content Area */}
        <div
          style={{ backgroundImage: "url(/images/shape.jpg)" }}
          onClick={() => setOpen(false)}
          className="bg-cover bg-center bg-no-repeat min-h-screen py-6 px-2 md:px-8 pt-[100px] relative"
        >
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="relative z-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
