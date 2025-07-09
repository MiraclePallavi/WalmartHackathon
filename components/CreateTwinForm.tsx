"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twinFullSchema, TwinFullInput } from "@/lib/validation";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TwinIdentity from "./TwinIdentity";
import PrefStyle from "./PrefStyle";
import GiftingPref from "./GiftingPrefs";
import axios from "axios";
export default function CreateTwinForm() {
  const router = useRouter();
  const form = useForm<TwinFullInput>({
    resolver: zodResolver(twinFullSchema),
    defaultValues: {
      title: "",
      description: "",
      relationship: "",
      gender: "",
      dateOfBirth: undefined,
      interestsHobbies: [],
      budgetRange: [0, 5000],
      personalityVibe: [],
      favoriteColors: [],
      isGiftingTwin: false,
    },
  });

  const onSubmit = async(values: TwinFullInput) => {
    try {
      const response = await axios.post("/api/twinForm", values);
    router.push("/home");
    } catch (error) {
      console.error("Error submitting form:", error);
      return;
      
    }
  };
  const onError = (errors: any) => {
  console.log("Validation errors:", errors);
};

  return (
    <div className="mt-20 text-center">
      <h1 className="text-xl font-bold">Create a Twin</h1>
      <Form<TwinFullInput> {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="mx-auto max-w-xl space-y-6">
          <div className="flex mt-5 font-bold text-blue-700"><h3>Twin Identity</h3></div>
            
            <TwinIdentity form={form} />
        
<div className="flex mt-5 font-bold text-blue-700"><h3>Preferences & Style</h3></div>

            <PrefStyle control={form.control} />
         <div className="flex mt-5 font-bold text-blue-700"><h3>Gifting Preferences</h3></div>
            <GiftingPref control={form.control} />
          

          <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-500 font-bold">
            Create Twin
          </Button>
          
        
        </form>
      </Form>
    </div>
  );
}
