import {
    BookOpenIcon,
    DatabaseIcon,
    HomeIcon,
    MailIcon,
    SettingsIcon,
    Trophy,
} from "lucide-react";

export const menuItems = [
    {
        label: "Home",
        path: "/",
        roles: [
            "ROLE_ADMIN",
            "ROLE_TEACHER",
            "ROLE_SYSTEM_ADMIN",
            "ROLE_STUDENT",
        ],
        icon: <HomeIcon className="w-5 h-5" />,
    },
    {
        label: "Data Info",
        path: "/data-info",
        roles: ["ROLE_ADMIN", "ROLE_STUDENT", "ROLE_TEACHER"],
        icon: <DatabaseIcon className="w-5 h-5" />,
    },
    {
        label: "Achievements",
        path: "/achievements",
        roles: ["ROLE_STUDENT"],
        icon: <Trophy className="w-5 h-5" />,
    },
    {
        label: "Mastering",
        path: "/mastering",
        roles: ["ROLE_ADMIN", "ROLE_SYSTEM_ADMIN"],
        icon: <BookOpenIcon className="w-5 h-5" />,
    },
    {
        label: "Account Settings",
        path: "/settings",
        roles: [
            "ROLE_ADMIN",
            "ROLE_SYSTEM_ADMIN",
            "ROLE_TEACHER",
            "ROLE_STUDENT",
        ],
        icon: <SettingsIcon className="w-5 h-5" />,
    },
    {
        label: "Communications",
        path: "/communications",
        roles: [
            "ROLE_ADMIN",
            "ROLE_SYSTEM_ADMIN",
            "ROLE_TEACHER",
            "ROLE_STUDENT",
        ],
        icon: <MailIcon className="w-5 h-5" />,
    },
];
