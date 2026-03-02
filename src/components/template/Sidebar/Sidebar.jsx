import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

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

export default function Sidebar() {
    const user = useUser();

    return (
        <div className="sidebar h-screen">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="default">
                        <MenuIcon />
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="left"
                    className="w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out"
                >
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <ul className="flex flex-col gap-1 mt-4">
                        {menuItems
                            .filter((item) => item.roles.includes(user?.role))
                            .map((item) => (
                                <li key={item.path} className="w-full">
                                    <SheetClose asChild>
                                        <NavLink
                                            to={item.path}
                                            className="flex gap-2 items-center w-full p-3"
                                        >
                                            {item.icon}

                                            <span>{item.label}</span>
                                        </NavLink>
                                    </SheetClose>
                                </li>
                            ))}
                    </ul>
                    <SheetFooter className={"float-start mt-8"}>
                        <Button
                            type="submit"
                            className="text-red-600"
                            variant="destructive"
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
