import { BookOpenIcon, DatabaseIcon, HomeIcon, MailIcon, SettingsIcon, Trophy  } from "lucide-react";

export const menuItems = [
    {
        label: "Home",
        path: "/",
        roles: ["admin", "teacher", "super-admin", "student"],
        icon: <HomeIcon className="w-5 h-5" />,
    },
    {
        label: "Data Info",
        path: "/data-info",
        roles: ["admin", "super-admin", "student","teacher"],
        icon: <DatabaseIcon className="w-5 h-5" />,
    },
    {
        label: "Achievements",
        path: "/achievements",
        roles: ["student"],
        icon: <Trophy  className="w-5 h-5" />,
    },
    {
        label: "Mastering",
        path: "/mastering",
        roles: ["admin", "super-admin"],
        icon: <BookOpenIcon className="w-5 h-5" />,
    },
    {
        label: "Account Settings",
        path: "/settings",
        roles: ["admin", "super-admin", "teacher", "student"],
        icon: <SettingsIcon className="w-5 h-5" />,
    },
    {
        label: "Communications",
        path: "/communications",
        roles: ["admin", "super-admin", "teacher", "student"],
        icon: <MailIcon className="w-5 h-5" />,
    },
];
