import React from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function CustomSelect({
    name,
    control,
    label,
    placeholder = "Tanlang...",
    options = [],
    loading = false,
    disabled,
    defaultValue,
    className,
    containerClassName,
    isMulti = false,
    ...props
}) {
    return (
        <div className={cn("space-y-2", containerClassName)}>
            {label && (
                <label className="text-[black] text-sm font-medium text-foreground">
                    {label}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ?? (isMulti ? [] : "")}
                render={({ field, fieldState }) => {
                    const multiValue = Array.isArray(field.value)
                        ? field.value
                        : [];

                    return (
                        <>
                            {isMulti ? (
                                <div
                                    className={cn(
                                        "border text-[black] rounded-md p-1 min-h-10 flex flex-wrap gap-1",
                                        fieldState.error && "border-red-500",
                                        (loading || disabled) &&
                                        "opacity-50 cursor-not-allowed",
                                        className
                                    )}
                                >
                                    {multiValue.map((val) => {
                                        const opt = options.find(
                                            (o) => o.value === val
                                        );
                                        return (
                                            <Badge
                                                key={val}
                                                variant="secondary"
                                                className="flex items-center gap-1 px-2 py-1"
                                            >
                                                {opt?.label ?? val}
                                                <button
                                                    type="button"
                                                    disabled={
                                                        loading || disabled
                                                    }
                                                    onClick={() =>
                                                        field.onChange(
                                                            multiValue.filter(
                                                                (v) => v !== val
                                                            )
                                                        )
                                                    }
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        );
                                    })}

                                    <Select
                                        className="text-[black]"
                                        disabled={loading || disabled}
                                        onValueChange={(val) => {
                                            if (!multiValue.includes(val)) {
                                                field.onChange([
                                                    ...multiValue,
                                                    val,
                                                ]);
                                            }
                                        }}
                                    >
                                        <SelectTrigger className="border-0 shadow-none h-7 w-auto flex-1 min-w-24 focus:ring-0">
                                            {loading ? (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
                                                    <span className="text-sm text-[black]">
                                                        Loading...
                                                    </span>
                                                </div>
                                            ) : (
                                                <SelectValue
                                                    placeholder={placeholder}
                                                />
                                            )}
                                        </SelectTrigger>
                                        <SelectContent className="text-[#000]" >
                                            {options
                                                .filter(
                                                    (opt) =>
                                                        !multiValue.includes(
                                                            opt.value
                                                        )
                                                )
                                                .map((opt) => (
                                                    <SelectItem
                                                        key={opt.value}
                                                        value={opt.value}
                                                        disabled={opt.disabled}
                                                        className="text-[black]"
                                                    >
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            ) : (
                                <Select
                                    className="text-[black]"
                                    value={field.value ?? ""}
                                    onValueChange={field.onChange}
                                    disabled={loading || disabled}
                                    {...props}
                                >
                                    <SelectTrigger
                                        className={cn(
                                            fieldState.error &&
                                            "border-red-500  focus-visible:ring-red-500",
                                            className
                                        )}
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
                                                <span className="text-sm text-[black] ">
                                                    Loading...
                                                </span>
                                            </div>
                                        ) : (
                                            <SelectValue
                                                placeholder={placeholder}
                                            />
                                        )}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((opt) => (
                                            <SelectItem
                                                key={opt.value}
                                                value={opt.value}
                                                disabled={opt.disabled}
                                            >
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                            {fieldState.error && (
                                <p className="text-sm text-red-500">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </>
                    );
                }}
            />
        </div>
    );
}
