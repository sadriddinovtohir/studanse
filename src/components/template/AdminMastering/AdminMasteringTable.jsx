import SearchInput from "@/components/molecules/Searchinput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, PlusIcon, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getColumns, getDataConfig, item } from "./data";
import CustomTable from "@/components/organisms/CustomTable";
import AdminMasteringCreate from "./AdminMasteringCreate";
import { useQuery } from "@tanstack/react-query";
import {
    adminAllQuery,
    classGroupQuery,
    lessonAllQuery,
    reasonAllQuery,
    schoolMineQuery,
    studentsAllQuery,
    subjectAllQuery,
    teacherAllQuery,
} from "@/query";
import { useSearchParams } from "react-router-dom";
import { MUTATION_CONFIG } from "@/config/mutationConfig";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { CustomPagination } from "@/components/molecules/CustomPagination";

export default function AdminMasteringTable({
    selectedEntity,
    setSelectedEntity,
}) {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const selectedConfig = item.find(
        (config) => config.type === selectedEntity
    );
    const mutationConf = MUTATION_CONFIG[selectedConfig.title];

    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState(
        getDataConfig(selectedConfig?.type)?.filterDto ?? {}
    );

    useEffect(() => {
        const initialParams = getDataConfig(selectedConfig?.type)?.params;
        const initialFilters = getDataConfig(selectedConfig?.type)?.filterDto;
        if (initialParams) setSearchParams(initialParams);
        if (initialFilters) setFilters(initialFilters);
    }, [selectedConfig?.type]);

    const QUERY_MAP = {
        students: (params, filters) => studentsAllQuery(params, filters),
        teachers: (params, filters) => teacherAllQuery(params, filters),
        admins: (params) => adminAllQuery(params),
        classes: (params) => classGroupQuery(params),
        lessons: (params, filters) => lessonAllQuery(params, filters),
        subjects: (params, filters) => subjectAllQuery(params, filters),
        reasons: (params, filters) => reasonAllQuery(params, filters),
        school: () => schoolMineQuery(),
    };

    const { data, isLoading } = useQuery({
        ...QUERY_MAP[selectedConfig.type]?.(searchParams, filters),
        queryKey: [selectedConfig.type, searchParams.toString(), filters],
        enabled: !!selectedConfig.type,
    });

    const tableData =
        data?.data?.data?.content ??
        (selectedConfig.type === "school" ? [data?.data?.data] : []);

    const { mutate: deleteItem, isPending } = useCustomMutation({
        mutationFn: mutationConf.delete,
        invalidateKeys: mutationConf.invalidateKeys(id),
        successMessage: mutationConf.successMessage("delete", id),
    });

    const isSchholMian = selectedConfig.type == "school";

    const pagination = data?.data?.data;

    return (
        <div>
            <AdminMasteringCreate
                selectField={selectedConfig}
                open={open}
                setOpen={setOpen}
                id={id}
                school={tableData || undefined}
                setId={setId}
            />
            <div className="flex items-center gap-3 mb-8">
                <Button
                    variant="light"
                    onClick={() => setSelectedEntity("")}
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
                            Manage {selectedConfig.title}
                        </h2>
                        <div className="flex gap-3 items-center">
                            {!isSchholMian && (
                                <SearchInput
                                    startIcon={<Search size={15} />}
                                    className={"h-[30px]"}
                                />
                            )}
                            <Button
                                onClick={() => {
                                    if (isSchholMian) {
                                        setId("");
                                    }
                                    setOpen(true);
                                }}
                                startIcon={!isSchholMian && <PlusIcon />}
                                variant={"primary"}
                                className={`bg-gradient-to-r ${selectedConfig?.buttonGradient} hover:opacity-90 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                            >
                                {isSchholMian
                                    ? "Edit school info"
                                    : `Add ${selectedConfig.title}`}
                            </Button>
                        </div>
                    </div>
                    <CustomTable
                        columns={getColumns(selectedEntity)}
                        data={tableData}
                        onEdit={(id) => {
                            setId(id);
                            setOpen(true);
                        }}
                        isSchoolMine={isSchholMian}
                        onDelete={(id) => deleteItem(id)}
                        isLoading={isLoading || isPending}
                    />
                    {selectedConfig.type !== "school" && (
                        <CustomPagination
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            pagination={pagination}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
