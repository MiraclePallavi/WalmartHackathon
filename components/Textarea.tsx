import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
interface CustomTextareaProps<TSchema extends ZodTypeAny> {
    control: Control<z.infer<TSchema>>;
    name: FieldPath<z.infer<TSchema>>;
    label: string;
    placeholder: string;
    className?: string;
  }
  

    export function TextareaWithLabel<TSchema extends ZodTypeAny>({
      control,
      name,
      label,
      placeholder,
      className,
    }: CustomTextareaProps<TSchema>) {
  return (
    <div className="grid w-full gap-.6">
      <Label htmlFor="message">{label}</Label>
      <Textarea placeholder={placeholder} id="message" className={className}/>
    </div>
  )
}
