// CustomSwitch.tsx
"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CustomSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
}

export function CustomSwitch({
  checked,
  onCheckedChange,
  id = "gift-switch",
}: CustomSwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor={id} className="font-bold">
        Is this a gifting Twin?
      </Label>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
