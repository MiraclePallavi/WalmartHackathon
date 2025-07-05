'use client';
import React, {useState} from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TwinIdentity from "./TwinIdentity";
import PrefStyle from "./PrefStyle";
import GiftingPref from "./GiftingPrefs";
import { twinCreateSchema } from "@/lib/validation";



export default function CreateTwinForm() {
  const form = useForm<z.infer<typeof twinCreateSchema>>({
    resolver: zodResolver(twinCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      relationship: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof twinCreateSchema>) => {
    console.log("Twin submitted", values);
    // API call or next step
  };

  return (
    <>
      <div className="create-twin-form text-black text-center mt-20">
        <h1 className="font-bold text-xl">Create a Twin</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
            <div className="flex mt-5 font-bold text-blue-700"><h3>Twin Identity</h3></div>
            {/* <section className="space-y-3 bg-zinc-100 px-6 py-4"> */}
              <TwinIdentity form={form} />
            {/* </section> */}
            <div className="flex mt-5 font-bold text-blue-700"><h3>Preferences & Style</h3></div>
            <PrefStyle/>
            <div className="flex mt-5 font-bold text-blue-700"><h3>Gifting Preferences</h3></div>
            <GiftingPref/>
            <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-500 font-bold mb-10">Create Twin</Button>
          </form>
        </Form>
      </div>
    </>
  );
}