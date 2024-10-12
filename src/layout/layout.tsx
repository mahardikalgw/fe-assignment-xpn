import { Button } from "@/components/ui/button";
import { tokenStore } from "@/states";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';

export default function Layout(): React.ReactNode {
  const navigate = useNavigate();
  const setToken = tokenStore((state) => state.setToken);
  const token = tokenStore((state) => state.token);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const handleLogout = () => {
    setToken("");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block md:w-64 bg-white shadow-lg md:sticky w-72 md:top-0 h-screen absolute md:relative z-10`}
      >
        <div className="p-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Button className="md:hidden" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Icon icon="icon-park-outline:close" />
            </Button>
          </div>
          <ul className="mt-5 flex flex-col justify-between h-full">
            <li className="py-2 hover:bg-gray-100 px-2">
              <Link to="/dashboard/index">
                <p>Dashboard</p>
              </Link>
            </li>
            {/* Other sidebar links can be added here */}
            <div className="mt-[30rem]"> {/* Pushes the logout button to the bottom */}
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Button to open sidebar on mobile */}
        <div className="md:hidden p-4">
          <Button size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Icon icon="icon-park-outline:hamburger-button" />
          </Button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
