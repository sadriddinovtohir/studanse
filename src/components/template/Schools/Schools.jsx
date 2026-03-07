import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusIcon, Search } from "lucide-react";
import React, { useState } from "react";
import { item } from "../SuperAdminMastering/data";
import { useNavigate } from "react-router-dom";
import { colums } from "./data";
import CustomTable from "@/components/organisms/CustomTable";
import SchoolsCreate from "./SchoolsCreate";
import SearchInput from "@/components/molecules/Searchinput";
import { useQuery } from "@tanstack/react-query";
import { schoolAllQuery } from "@/query";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { schoolDelete } from "@/service/school";
import { Card, CardContent } from "@/components/ui/card";

export default function Schools() {
    const navigate = useNavigate();
    const selectedConfig = item.find((config) => config.type === "schools");
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");

    const { data, isLoading } = useQuery({ ...schoolAllQuery() });
    const schoolsData = data?.data?.data || [];

    const { mutate: deleteSchool, isPending: isDeleting } = useCustomMutation({
        mutationFn: schoolDelete,
        invalidateKeys: ["school-all"],
        successMessage: "Maktab o'chirildi!",
    });
    return (
        <div>
            <SchoolsCreate
                open={open}
                id={id}
                setId={setId}
                setOpen={setOpen}
            />
            <div className="flex items-center gap-3 mb-8">
                <Button
                    variant="light"
                    onClick={() => navigate(-1)}
                    className="h-10 w-10 p-0 rounded-xl border-white/20 dark:border-white/10 hover:bg-white/10 dark:hover:bg-white/5"
                >
                    <ArrowLeft className="h-4 w-4 dark:text-white" />
                </Button>
                <div
                    className={`p-2 rounded-xl bg-gradient-to-br ${selectedConfig?.gradient} border ${selectedConfig?.borderColor}`}
                >
                    {selectedConfig && (
                        <selectedConfig.icon
                            className={`h-6 w-6 ${selectedConfig.iconColor}`}
                        />
                    )}
                </div>
                <h1 className="text-2xl font-bold text-foreground">
                    {selectedConfig?.title}
                </h1>
            </div>

            <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl">
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold dark:text-white">
                            Manage Schools
                        </h2>
                        <div className="flex gap-3 items-center">
                            <SearchInput
                                startIcon={<Search size={15} />}
                                className={"h-[30px]"}
                            />
                            <Button
                                onClick={() => {
                                    setOpen(true);
                                    setId("");
                                }}
                                startIcon={<PlusIcon />}
                                variant={"primary"}
                            >
                                Add School
                            </Button>
                        </div>
                    </div>
                    <CustomTable
                        columns={colums}
                        data={schoolsData}
                        onEdit={(id) => {
                            setOpen(true);
                            setId(id);
                        }}
                        onDelete={(id) => deleteSchool(id)}
                        isLoading={isLoading || isDeleting}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
