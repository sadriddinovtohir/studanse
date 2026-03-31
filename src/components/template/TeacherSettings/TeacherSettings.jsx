import React from "react";
import CustomSettings from "../CustomSettings/CustomSettings";
import { useQuery } from "@tanstack/react-query";
import { getUserSettingsQuery } from "@/query";

export default function TeacherSettings() {
    const { data } = useQuery({ ...getUserSettingsQuery() });

    return (
        <div>
            <CustomSettings />
        </div>
    );
}
