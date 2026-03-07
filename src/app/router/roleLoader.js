import { redirect } from "react-router-dom";
import { getCurrentUser } from "../../features/auth/authService";

export const roleLoader = (allowedRoles) => {
    return async () => {
        const user = await getCurrentUser();
        if (!user) {
            throw redirect("/login");
        }

        if (allowedRoles && !allowedRoles.includes(user)) {
            throw redirect("/*");
        }

        return user;
    };
};
