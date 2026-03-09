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
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
              disabled={loading || disabled}
              {...props}
            >
              <SelectTrigger
                className={cn(
                  fieldState.error &&
                    "border-red-500 focus-visible:ring-red-500",
                  className,
                )}
              >
                {loading ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
                    <span className="text-sm">Yuklanmoqda...</span>
                  </div>
                ) : (
                  <SelectValue placeholder={placeholder} />
                )}
              </SelectTrigger>

              <SelectContent>
                {options?.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={String(opt.value)}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
