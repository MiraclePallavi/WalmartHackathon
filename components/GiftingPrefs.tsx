"use client";
import React from "react";
import { useController, Control } from "react-hook-form";
import { CustomSwitch } from "./CustomSwitch";
import { TwinFullInput } from "@/lib/validation";

interface GiftingPrefProps {
  control: Control<TwinFullInput>;
}

export default function GiftingPref({ control }: GiftingPrefProps) {
  const { field: { value: isGifting, onChange } } = useController({
    name: "isGiftingTwin",
    control,
    defaultValue: false,
  });

  return <CustomSwitch checked={isGifting} onCheckedChange={onChange} />;
}
