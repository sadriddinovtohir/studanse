import React, { useEffect } from "react";
import { datOfWeek, getValues, isActive, status } from "./data";
import { CustomSheet } from "@/components/organisms/CustomSheet";
import { CustomInput } from "@/components/molecules/CustomInput";
import { CustomSelect } from "@/components/molecules/CustomSelect";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CustomTextarea } from "@/components/organisms/CustomTextarea";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useQuery } from "@tanstack/react-query";
import {
    adminClassesstudentsQuery,
    adminQuery,
    classGroupByIdQuery,
    lessonQuery,
    reasonQuery,
    studentQuery,
    subjectAllQuery,
    subjectQuery,
    teacherAdminAllQuery,
    teacherQuery,
} from "@/query";
import { MUTATION_CONFIG } from "@/config/mutationConfig";

const DETAIL_QUERY_CONFIG = {
    Student: (id) => studentQuery(id),
    Teacher: (id) => teacherQuery(id),
    Admin: (id) => adminQuery(id),
    Lesson: (id) => lessonQuery(id),
    Subject: (id) => subjectQuery(id),
    Class: (id) => classGroupByIdQuery(id),
    Reason: (id) => reasonQuery(id),
};

const getOptionsMap = ({ classOptions, teacherOptions, subjectOptions }) => ({
    classGroupId: classOptions,
    teacherId: teacherOptions,
    subjectId: subjectOptions,
    status: status,
    userStatus: status,
    isActive: isActive,
    dayOfWeek: datOfWeek,
});

export default function AdminMasteringCreate({
    selectField,
    open,
    setOpen,
    id,
    setId,
    school,
}) {
    const config = getValues(selectField.type);
    const mutationConf = MUTATION_CONFIG[selectField.title];
    const isSchool = selectField.type === "school";

    const { handleSubmit, control, reset } = useForm({
        defaultValues: config?.defaultValues,
    });

    const needsClasses =
        !!open && (config.title === "Student" || config.title === "Lesson");
    const needsTeachers =
        !!open && (config.title === "Class" || config.title === "Lesson");
    const needsSubjects = !!open && config.title === "Lesson";

    const { data: adminClassesData } = useQuery({
        ...adminClassesstudentsQuery(),
        enabled: needsClasses,
    });

    const { data: teacherAdminData } = useQuery({
        ...teacherAdminAllQuery(),
        enabled: needsTeachers,
    });

    const { data: subjectData } = useQuery({
        ...subjectAllQuery(),
        enabled: needsSubjects,
    });

    const detailQueryConfig = DETAIL_QUERY_CONFIG[config.title];
    const { data: detailData } = useQuery({
        ...detailQueryConfig?.(id),
        enabled: !!id && !!open && !!detailQueryConfig,
    });

    const classOptions =
        adminClassesData?.data?.data?.map((i) => ({
            value: i.classId,
            label: i.className,
        })) ?? [];

    const teacherOptions =
        teacherAdminData?.data?.data?.map((i) => ({
            value: i.id,
            label: `${i.firstName} ${i.lastName}`,
        })) ?? [];

    const subjectOptions =
        subjectData?.data?.data?.content?.map((i) => ({
            value: i.id,
            label: i.name,
        })) ?? [];

    const getOptions = (fieldName) =>
        getOptionsMap({ classOptions, teacherOptions, subjectOptions })[
            fieldName
        ] ?? [];

    const LessonData = {
        ...detailData?.data?.data,
        isActive: String(detailData?.data?.data?.isActive),
    };

    const editDataMap = {
        Student: detailData?.data?.data,
        Teacher: detailData?.data?.data,
        Admin: detailData?.data?.data,
        Lesson: LessonData,
        Subject: detailData?.data?.data,
        Reason: detailData?.data?.data,
        Class: detailData?.data?.data,
        School: school?.[0],
    };

    useEffect(() => {
        if (!open && !isSchool) {
            reset(config.defaultValues);
            return;
        }
        if (!id && !isSchool) {
            reset(config.defaultValues);
            return;
        }

        const editData = editDataMap[config.title];
        if (!editData) return;

        reset(editData);
    }, [open, id, detailData, isSchool]);

    const schoolId = school?.[0]?.id;

    const isToast = id || schoolId ? "update" : "create";
    const { mutate: mutation, isPending } = useCustomMutation({
        mutationFn: id
            ? mutationConf.update(id)
            : isSchool
            ? mutationConf.update(schoolId)
            : mutationConf.create,
        invalidateKeys: mutationConf.invalidateKeys(id || schoolId),
        successMessage: mutationConf.successMessage(isToast, id || schoolId),
        onSuccess: () => {
            setId("");
            reset(config.defaultValues);
            setOpen(false);
        },
    });

    const onSubmit = (data) => {
        if (isSchool) {
            const payload = {
                name: data.name,
                address: data.address,
                establishedYear: data.establishedYear,
            };
            mutation(payload);
        } else {
            mutation(data);
        }
    };

    return (
        <CustomSheet
            open={open}
            onClose={(val) => {
                if (!val) {
                    setId("");
                    reset(config?.defaultValues);
                }
                setOpen(val);
            }}
            title={
                <div className="flex items-center gap-2">
                    {selectField && (
                        <selectField.icon
                            className={`h-5 w-5 ${selectField.iconColor}`}
                        />
                    )}
                    <h3 className="m-0">
                        {id || isSchool
                            ? `Edit ${selectField.title}`
                            : `Add New ${selectField.title}`}
                    </h3>
                </div>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {config.fields.map((field) => (
                    <div key={field.name}>
                        {field.type === "select" ? (
                            <CustomSelect
                                name={field?.name}
                                label={field.label}
                                control={control}
                                options={getOptions(field.name)}
                                placeholder={field.placeholder ?? "Tanlang..."}
                                containerClassName="mb-4"
                                isMulti={field.isMulti ?? false}
                            />
                        ) : field.type === "textarea" ? (
                            <CustomTextarea
                                name={field.name}
                                label={field.label}
                                control={control}
                                rows={3}
                                placeholder={field.placeholder ?? "Kiriting..."}
                            />
                        ) : (
                            <CustomInput
                                name={field.name}
                                control={control}
                                label={field.label}
                                type={field.type}
                                placeholder={field.placeholder ?? "Kiriting..."}
                                containerClassName="mb-4"
                            />
                        )}
                    </div>
                ))}

                <div className="mt-4 flex gap-3 justify-end">
                    <Button
                        type="button"
                        variant="light"
                        className="rounded-xl border-white/20 dark:border-white/10 hover:bg-white/10 dark:hover:bg-white/5"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className={`bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[100px]`}
                    >
                        {isPending
                            ? id || schoolId
                                ? "Updating..."
                                : "Creating..."
                            : id || schoolId
                            ? "Update"
                            : "Create"}
                    </Button>
                </div>
            </form>
        </CustomSheet>
    );
}
