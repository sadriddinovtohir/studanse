import React, { useEffect, useState } from "react";
import { CustomInput } from "@/components/molecules/CustomInput";
import { CustomSheet } from "@/components/organisms/CustomSheet";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CustomSelect } from "@/components/molecules/CustomSelect";
import { useQuery } from "@tanstack/react-query";
import { schoolsAllQuery, superAdminByIdlQuery } from "@/query";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { superAdminCreate, superAdminUpate } from "@/service/super-admin";
import { userStatus, values } from "./data";
import { item } from "../SuperAdminMastering/data";

export default function SuperAdminsCreate({ open, setOpen, id, setId }) {
  const [schoolsData, setSchoolsData] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    defaultValues: values,
  });
  const selectedConfig = item.find((config) => config.type === "admins");
  const { data: schools } = useQuery({ ...schoolsAllQuery() });
  const schoolData = schools?.data?.data || [];

  useEffect(() => {
    const result = schoolData.map((school) => {
      return {
        value: school.id,
        label: school.name,
      };
    });
    setSchoolsData(result);
  }, [schools]);

  const { data } = useQuery({
    ...superAdminByIdlQuery(id),
    enabled: !!id,
  });
  const admins = data?.data?.data || {};

  useEffect(() => {
    if (id && admins && Object.keys(admins).length > 0) {
      reset({
        ...admins,
        schoolId: admins.school.id,
      });
    }
  }, [admins, id]);

  const { mutate: createSystemAdmin, isPending: isCreating } =
    useCustomMutation({
      mutationFn: superAdminCreate,
      invalidateKeys: ["super-admin-all"],
      successMessage: "System admin yaratildi!",
      onSuccess: () => {
        setOpen("");
        reset(values);
        setId("");
      },
    });

  const { mutate: updateSystemAdmin, isPending: isUpdating } =
    useCustomMutation({
      mutationFn: ({ id, data }) => superAdminUpate(id, data),
      invalidateKeys: ["super-admin", "super-admin-all"],
      successMessage: "System admin yangilandi!",
      onSuccess: () => {
        setOpen("");
        reset(values);
        setId("");
      },
    });

  const onSubmit = (data) => {
    if (id) {
      updateSystemAdmin({ id, data });
    } else {
      createSystemAdmin(data);
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
            <h3 className="m-0">{id ? "Edit Admin" : "Add New Admin"}</h3>
          </div>
        }
      >
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              name="firstName"
              control={control}
              label="Eirst Name"
              placeholder="Enter last name"
              loading={isSubmitting}
              containerClassName={"mb-4"}
            />
            <CustomInput
              name="lastName"
              control={control}
              label="Last Name"
              placeholder="Enter last name"
              loading={isSubmitting}
              containerClassName={"mb-4"}
            />

            <CustomInput
              name="email"
              control={control}
              label="Email"
              type="email"
              placeholder="Enter email address"
              loading={isSubmitting}
              containerClassName={"mb-4"}
            />

            <CustomInput
              name="phoneNumber"
              control={control}
              label="Phone Number"
              type="tel"
              loading={isSubmitting}
              placeholder="Enter phone number"
            />

            <CustomInput
              name="dateOfBirth"
              control={control}
              type="date"
              label="Date of Birth"
              loading={isSubmitting}
              containerClassName={"mb-4"}
            />

            <CustomInput
              name="hiredDate"
              control={control}
              type="date"
              label="Hired Date"
              loading={isSubmitting}
              containerClassName={"mb-4"}
            />

            <CustomSelect
              name="schoolId"
              control={control}
              label="School"
              options={schoolsData}
              placeholder="Select school"
              containerClassName={"mb-4"}
            />

            <CustomSelect
              name="userStatus"
              control={control}
              label="Status"
              options={userStatus}
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
              <Button variant="primary">Update</Button>
            </div>
          </form>
        </div>
      </CustomSheet>
    </div>
  );
}
