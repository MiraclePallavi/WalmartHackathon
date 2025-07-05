"use client";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Custominput from "@/components/customInputField";
import CustomSelect from "./Select";
import { DatePicker } from "./date-picker";
import { TextareaWithLabel } from "./Textarea";

// const twinCreateSchema = z.object({
//   title: z.string().min(3, "Title too short"),
//   description: z.string().min(10, "Description too short"),
// });

const twinInputStyles =
  "rounded-sm bg-white text-black border-black focus:border-black focus:border-3 focus-visible:ring-0 focus-visible:border-black mt-1";

const familyOptions = [
  "Self",
  "Mother",
  "Father",
  "Sister",
  "Brother",
  "Daughter",
  "Son",
  "Grandmother",
  "Grandfather",
  "Aunt",
  "Uncle",
  "Cousin",
];

const friendsSocialOptions = [
  "Friend",
  "Best Friend",
  "Partner",
  "Boyfriend",
  "Girlfriend",
  "Roommate",
  "Classmate",
];

const professionalOptions = ["Colleague", "Manager", "Mentor", "Client"];

const otherOptions = [
  "Neighbor",
  "Teacher",
  "Coach",
  "Acquaintance",
  "Pet",
  "Other",
];

const genderOptions = [
  "Man",
  "Woman",
  "Non-binary",
  "Genderqueer",
  "Agender",
  "Transgender",
  "Gender not listed",
  "Prefer not to answer",
];

export default function TwinIdentity({
  form,
}: {
  form: UseFormReturn<
    { title: string; description: string; relationship: string },
    any,
    { title: string; description: string ;relationship: string}
  >;
}) {
  return (
    <>
      <Custominput
        control={form.control}
        name="title"
        label="Twin Name"
        placeholder="What do you want to call this twin? E.g., “Dad”, “Campus Twin”, “Diya“"
        className={twinInputStyles}
      />
      <div className="flex gap-4">
        <CustomSelect
          label="Relationship"
          placeholder="Select Relationship"
          className={twinInputStyles}
          familyOptions={familyOptions}
          friendsSocialOptions={friendsSocialOptions}
          professionalOptions={professionalOptions}
          otherOptions={otherOptions}
        />
        <DatePicker className={twinInputStyles} />
        <CustomSelect
          label="Gender"
          placeholder="Select Gender"
          className={twinInputStyles}
          genderOptions={genderOptions}
        />
      </div>
      
      <TextareaWithLabel
        control={form.control}
        name="description"
        label="Description"
        placeholder="How would you describe the twin?"
        className={twinInputStyles}
      />
    </>
  );
}
