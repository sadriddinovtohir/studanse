import { Link, Outlet, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import Sidebar from "../components/template/Sidebar/Sidebar";
import ThemeMode from "@/components/organisms/theme/ThemeMode";
import project_Logo from "../assets/img/project_logo.png";
import user_icon from "../assets/svg/user_icon.svg";

export const DashboardLayout = () => {
  const nav = useNavigate();
  return (
    <div className="flex min-h-screen bg-dashbordcolor">
      <div className="my-5 max-h-[95vh] pl-3">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-4 py-1 ">
          <Link
            to="/"
            className="flex items-center gap-1 cursor-pointer
  transition-all duration-300
  hover:scale-105 hover:z-50"
          >
            <img
              className="w-[60px] h-[60px] object-contain"
              src={project_Logo}
              alt="Project Logo"
            />

            <h3 className="text-xl font-semibold text-textColor">
              Stud<span className="text-red-500">ance</span>
            </h3>
          </Link>
          <div className="flex gap-5 items-center mr-4">
            <ThemeMode />
            <button
              onClick={() => nav("/settings")}
              className="relative w-[50px] h-[50px] "
            >
              <img
                className="w-full h-full rounded-full object-cover cursor-pointer"
                src={user_icon}
                alt="Profile"
              />
              <span className="absolute bottom-0 right-0 block w-4 h-4 bg-green-500 rounded-full border-2 border-white "></span>
            </button>
          </div>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900 max-h-screen">
            <Outlet />
          </div>
        </Suspense>
      </div>
    </div>
  );
};
