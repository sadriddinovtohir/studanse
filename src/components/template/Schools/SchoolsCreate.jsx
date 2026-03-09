import React, { useEffect } from "react";
import { CustomInput } from "@/components/molecules/CustomInput";
import { CustomSheet } from "@/components/organisms/CustomSheet";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CustomSelect } from "@/components/molecules/CustomSelect";
import { CustomTextarea } from "@/components/organisms/CustomTextarea";
import { schoolCreate, schoolUpdate } from "@/service/school";
import { useQuery } from "@tanstack/react-query";
import { schoolByIdQuery } from "@/query";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { countryCode, status, values } from "./data";
import { item } from "../SuperAdminMastering/data";

export default function SchoolsCreate({ open, setOpen, id, setId }) {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset,
    } = useForm({
        defaultValues: values,
    });

    const selectedConfig = item.find((config) => config.type === "schools");
    const { data } = useQuery({
        ...schoolByIdQuery(id),
        enabled: !!id,
    });
    const school = data?.data?.data || {};

    useEffect(() => {
        if (id && school && Object.keys(school).length > 0) {
            reset(school);
        }
    }, [school, id]);

    const { mutate: createSchool, isPending: isCreating } = useCustomMutation({
        mutationFn: schoolCreate,
        invalidateKeys: ["schools-all"],
        successMessage: "Maktab yaratildi!",
        onSuccess: () => {
            setOpen("");
            reset(values);
            setId("");
        },
    });

    const { mutate: updateSchool, isPending: isUpdating } = useCustomMutation({
        mutationFn: ({ id, data }) => schoolUpdate(id, data),
        invalidateKeys: ["schools", "schools-all"],
        successMessage: "Maktab yangilandi!",
        onSuccess: () => {
            setOpen("");
            reset(values);
            setId("");
        },
    });

    const onSubmit = (data) => {
        if (id) {
            updateSchool({ id, data });
        } else {
            createSchool(data);
        }
    };

    return (
        <div>
            <CustomSheet
                open={open}
                onClose={(val) => {
                    setOpen(val);
                    if (!val) {
                        reset(values);
                        setId("");
                    }
                }}
                title={
                    <div className="flex items-center gap-2">
                        {selectedConfig && (
                            <selectedConfig.icon
                                className={`h-5 w-5 ${selectedConfig.iconColor}`}
                            />
                        )}
                        <h3 className="m-0">
                            {id ? "Edit School" : "Add New School"}
                        </h3>
                    </div>
                }
            >
                <div className="space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInput
                            name="name"
                            control={control}
                            label="Name"
                            placeholder="Enter school name"
                            loading={isSubmitting}
                            containerClassName={"mb-4"}
                        />

                        <CustomSelect
                            name="countryCode"
                            control={control}
                            label="Country Code"
                            options={countryCode}
                            placeholder="Select country name"
                            containerClassName={"mb-4"}
                        />

                        <CustomTextarea
                            name="address"
                            control={control}
                            label="Address"
                            rows={3}
                            placeholder="Enter address"
                        />

                        <CustomInput
                            name="establishedYear"
                            control={control}
                            label="Established Year"
                            loading={isSubmitting}
                            placeholder="Enter established year"
                            containerClassName={"mb-4"}
                        />

                        <CustomSelect
                            name="status"
                            control={control}
                            label="Status"
                            options={status}
                            placeholder="Select status"
                            containerClassName={"mb-4"}
                        />

                        <div className="mt-4 flex gap-3 justify-end">
                            <Button
                                variant="destructive"
                                className="rounded-full"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                loading={isUpdating || isCreating}
                                variant="primary"
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </CustomSheet>
        </div>
    );
}
