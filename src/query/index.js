import { schoolById, schoolsAll } from "@/service/school";
import { superAdminAll, superAdminById } from "@/service/super-admin";

// school
export const schoolAllQuery = () => {
    return {
        queryKey: ["school-all"],
        queryFn: async () => schoolsAll(),
    };
};

export const schoolByIdQuery = (id) => {
    return {
        queryKey: ["school", id],
        queryFn: async () => schoolById(id),
    };
};

// system admin
export const superAdminAllQuery = (params) => {
    return {
        queryKey: ["super-admin-all", params],
        queryFn: async () => superAdminAll(params),
    };
};

export const superAdminByIdlQuery = (id) => {
    return {
        queryKey: ["super-admin", id],
        queryFn: async () => superAdminById(id),
    };
};
