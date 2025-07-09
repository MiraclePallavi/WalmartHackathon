"use client";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useController, Control } from "react-hook-form";
import { TwinFullInput } from "@/lib/validation";

const colorOptions = ["Multicolor", "Silver", "Gold", "White", "Black", "Yellow",
  "Blue", "Red", "Pink", "Green", "Brown", "Purple", "Gray",
  "Clear", "Orange", "Beige", "Other", "Off-White", "Assorted", "Bronze"];
const colorMap: Record<string, string> = {
  Multicolor: "linear-gradient(45deg, red, yellow, green, blue)",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  White: "#FFFFFF",
  Black: "#000000",
  Yellow: "#FFFF00",
  Blue: "#0000FF",
  Red: "#FF0000",
  Pink: "#FFC0CB",
  Green: "#008000",
  Brown: "#A52A2A",
  Purple: "#800080",
  Gray: "#808080",
  Clear: "transparent",
  Orange: "#FFA500",
  Beige: "#F5F5DC",
  Other: "#D3D3D3",
  "Off-White": "#FAF9F6",
  Assorted: "#D8BFD8",
  Bronze: "#CD7F32"
}

interface MultiSelectColorDropdownProps {
  control: Control<TwinFullInput>;
  name: "favoriteColors";
}

export default function MultiSelectColorDropdown({
  control,
  name,
}: MultiSelectColorDropdownProps) {
  const { field: { value = [], onChange } } = useController({
    name,
    control,
    defaultValue: [],
  });

  const toggle = (c: string) =>
    onChange(value.includes(c) ? value.filter((x) => x !== c) : [...value, c]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[250px] justify-between">
          {value.length ? `${value.length} selected` : "Select favorite colors"}
          <span className="ml-auto text-sm text-muted-foreground">▼</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[250px] overflow-y-auto w-[250px]">
        {colorOptions.map((c) => (
          <label key={c} className="flex items-center gap-3 text-sm cursor-pointer">
            <Checkbox checked={value.includes(c)} onCheckedChange={() => toggle(c)} />
            <span
              className="w-4 h-4 rounded-full border border-gray-400"
              style={{ background: colorMap[c] ?? "#ccc" }}
            />
            {c}
          </label>
        ))}
      </PopoverContent>
    </Popover>
  );
}
