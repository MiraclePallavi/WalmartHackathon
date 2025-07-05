"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Control, FieldPath } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import classNames from "classnames";

interface CustomSelectProps<TSchema extends ZodTypeAny> {
  control: Control<z.infer<TSchema>>;
  name: FieldPath<z.infer<TSchema>>;
  label: string;
  placeholder: string;
  className?: string;
  familyOptions?: string[];
  friendsSocialOptions?: string[];
  professionalOptions?: string[];
  otherOptions?: string[];
  genderOptions?: string[];
}

function CustomSelect<TSchema extends ZodTypeAny>({
  control,
  name,
  label,
  placeholder,
  className,
  familyOptions,
  friendsSocialOptions,
  professionalOptions,
  otherOptions,
  genderOptions,
}: CustomSelectProps<TSchema>) {
  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="-mb-2">{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className={classNames(className, "w-full")}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {label === "Relationship" ? (
                <>
                  <SelectGroup>
                    <SelectLabel>Family</SelectLabel>
                    {familyOptions?.map((relation) => (
                      <SelectItem key={relation} value={relation}>
                        {relation}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Friends & Social</SelectLabel>
                    {friendsSocialOptions?.map((relation) => (
                      <SelectItem key={relation} value={relation}>
                        {relation}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Professional</SelectLabel>
                    {professionalOptions?.map((relation) => (
                      <SelectItem key={relation} value={relation}>
                        {relation}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Others</SelectLabel>
                    {otherOptions?.map((relation) => (
                      <SelectItem key={relation} value={relation}>
                        {relation}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </>
              ) : (
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  {genderOptions?.map((relation) => (
                    <SelectItem key={relation} value={relation}>
                      {relation}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomSelect;
