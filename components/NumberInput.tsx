import React from "react";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/Input";
import { Control, FieldPath } from "react-hook-form";
import { z, ZodTypeAny } from "zod";

interface CustomInputProps<TSchema extends ZodTypeAny> {
  control: Control<z.infer<TSchema>>;
  name: FieldPath<z.infer<TSchema>>;
  label: string;
  placeholder: string;
  className?: string;
}

export function NumberInput<TSchema extends ZodTypeAny>({
  control,
  name,
  label,
  placeholder,
  className,
}: CustomInputProps<TSchema>) {
  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className={className || "input-class"}
                type="number"
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
}
export default NumberInput;