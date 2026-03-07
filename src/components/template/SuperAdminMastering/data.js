import { Building2, Shield } from "lucide-react";

export const item = [
    {
        type: "schools",
        id: "1",
        title: "Schools",
        text: "Manage school information and configuration",
        btnText: "Manage Schools",
        gradient: "from-blue-500/20 to-cyan-500/20",
        borderColor: "border-blue-500/30",
        icon: Building2,
        iconColor: "text-blue-500",
        buttonGradient: "from-blue-600 to-cyan-600",
        path: "schools",
    },
    {
        type: "admins",
        id: "2",
        title: "Admins",
        text: "Manage school administrator accounts and permissions",
        btnText: "Manage Admins",
        icon: Shield,
        gradient: "from-purple-500/20 to-pink-500/20",
        borderColor: "border-purple-500/30",
        iconColor: "text-purple-500",
        buttonGradient: "from-purple-600 to-pink-600",
        path: "admins",
    },
];
