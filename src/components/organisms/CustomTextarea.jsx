import React from "react";
import { Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function CustomTextarea({
    name,
    control,
    label,
    loading = false,
    disabled,
    defaultValue,
    className,
    containerClassName,
    rows = 4,
    ...props
}) {
    return (
        <div className={cn("space-y-2", containerClassName)}>
            {label && (
                <label className="dark:text-white text-sm font-medium text-foreground">
                    {label}
                </label>
            )}

            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ?? ""}
                render={({ field, fieldState }) => (
                    <>
                        <div className="relative">
                            <Textarea
                                {...field}
                                {...props}
                                rows={rows}
                                value={field.value ?? ""}
                                disabled={loading || disabled}
                                className={cn(
                                    "resize-none",
                                    fieldState.error &&
                                        "border-red-500 focus-visible:ring-red-500",
                                    className,
                                )}
                            />

                            {loading && (
                                <div className="absolute right-3 top-3">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
                                </div>
                            )}
                        </div>

                        {fieldState.error && (
                            <p className="text-sm text-red-500">
                                {fieldState.error.message}
                            </p>
                        )}
                    </>
                )}
            />
        </div>
    );
}