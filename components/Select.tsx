"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";
import classNames from "classnames";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CustomSelectProps  {
  label: string;
  placeholder: string;
  className?: string;
  familyOptions?: string[];
  friendsSocialOptions?: string[];
  professionalOptions?: string[];
  otherOptions?: string[];
  genderOptions?: string[];
}

function CustomSelect({
  label,
  placeholder,
  className,
  familyOptions,
  friendsSocialOptions,
  professionalOptions,
  otherOptions,
  genderOptions,
}: CustomSelectProps) {
  const FormSchema = z.object({
    relationship: z.string({
      required_error: "Please select a relationship.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      relationship: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <FormField
        control={form.control}
        name="relationship"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="-mb-2.5">{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <Select>
                  <SelectTrigger className={classNames("w-[180px]", className)}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {label == "Relationship" ? (
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
              </FormControl>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default CustomSelect;
