import React from "react";
import CustomSettings from "../CustomSettings/CustomSettings";
import { useQuery } from "@tanstack/react-query";
import { getUserSettingsQuery } from "@/query";

export default function SuperAdminSettings() {
    const { data } = useQuery({ ...getUserSettingsQuery() });
    console.log(data);
    return (
        <div>
            <CustomSettings />
        </div>
    );
}
