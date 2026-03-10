import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

import { Button } from "../../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { MenuIcon, LogOut } from "lucide-react";
import { menuItems } from "./data";
import { authLogOut } from "@/service/login";

export default function Sidebar() {
  const navigate = useNavigate("");
  const { roles } = useContext(UserContext);

  const logOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    await authLogOut();
    navigate("/login");
  };

  return (
    <div className="sidebar h-[94vh] text-textColor">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-64 bg-bgColor shadow-lg transition-transform duration-300 ease-in-out h-[100vh] flex flex-col justify-between [&>button]:text-textColor"
        >
          <div>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col gap-1 mt-4">
              {menuItems
                .filter((item) => item.roles.includes(roles))
                .map((item) => (
                  <li key={item.path} className="w-full">
                    <SheetClose asChild>
                      <NavLink
                        to={item.path}
                        className="flex gap-2 items-center w-full p-3 text-textColor"
                      >
                        {item.icon}

                        <span>{item.label}</span>
                      </NavLink>
                    </SheetClose>
                  </li>
                ))}
            </ul>
          </div>
          <SheetFooter className={"float-start mt-8"}>
            <Button
              type="submit"
              className="w-[200px] "
              variant="destructive"
              onClick={logOut}
            >
              <LogOut />
              Log Out
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
