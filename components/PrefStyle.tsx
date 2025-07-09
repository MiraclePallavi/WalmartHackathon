"use client";
import React from "react";
import { useController, Control } from "react-hook-form";
import CustomTags from "./Tags";
import { CustomSlider } from "./CustomSlider";
import MultiSelectColorDropdown from "./SelectColor";
import { TwinFullInput } from "@/lib/validation";

interface PrefStyleProps {
  control: Control<TwinFullInput>;
}

const interestsHobbiesTags = [   "Fitness",
  "Music",
  "Art",
  "Reading",
  "Cooking",
  "DIY",
  "Crafts",
  "Fashion",
  "Photography",
  "Gardening",
  "Gaming",
  "Movies/TV Shows",
  "Anime",
  "Travel",];
const personalityVibeTags = [   "Minimalist",
  "Bold",
  "Trendy",
  "Classy",
  "Adventurous",
  "Elegant",
  "Sporty",
  "Geeky",
  "Chill",
  "Professional",
  "Creative",
  "Edgy",
  "Vintage",
  "Cute",
  "Luxury",
  "Eco-conscious",
  "Streetwear",
  "Playful",
  "Cozy",
  "Artsy",
  "Glamorous",
  "Boho",
  "Tech-savvy",
  "Mature",
  "Youthful",
  "Spiritual",
  "Quirky",
  "Modern",
  "Traditional",
  "High-energy",
  "Introverted",
  "Extroverted", ];

export default function PrefStyle({ control }: PrefStyleProps) {
  const { field: { value: interests, onChange: setInterests } } = useController({
    name: "interestsHobbies",
    control,
    defaultValue: [],
  });

  const { field: { value: vibes, onChange: setVibes } } = useController({
    name: "personalityVibe",
    control,
    defaultValue: [],
  });

  const { field: { value: budget, onChange: setBudget } } = useController({
    name: "budgetRange",
    control,
    defaultValue: [0, 5000],
  });

  // We don’t need to grab colors here — the dropdown does that itself.

  const toggle = (list: string[], tag: string, cb: (arr: string[]) => void) =>
    cb(list.includes(tag) ? list.filter((t) => t !== tag) : [...list, tag]);

  return (
    <>
      <div className="font-bold">Interests / Hobbies</div>
      <CustomTags
        tags={interestsHobbiesTags}
        selectedTags={interests}
        onTagToggle={(t) => toggle(interests, t, setInterests)}
      />

      <div className="font-bold mt-4">Preferred Budget Range</div>
      <CustomSlider value={budget} onValueChange={setBudget} />

      <div className="font-bold mt-4">Personality / Vibe</div>
      <CustomTags
        tags={personalityVibeTags}
        selectedTags={vibes}
        onTagToggle={(t) => toggle(vibes, t, setVibes)}
      />

      <div className="font-bold mt-4">Favorite Colors</div>
      <MultiSelectColorDropdown control={control} name="favoriteColors" />
    </>
  );
}
