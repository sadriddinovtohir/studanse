import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCustomMutation({
    mutationFn,
    invalidateKeys = [],
    onSuccess,
    onError,
    successMessage,
}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            invalidateKeys.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });
            if (successMessage) toast.success(successMessage);
            onSuccess?.(data);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message ?? "Xatolik yuz berdi");
            onError?.(error);
        },
    });
}
