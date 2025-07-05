import React, { useState } from "react";
import CustomTags from "./Tags";
import { CustomSlider } from "./CustomSlider";
import MultiSelectColorDropdown from "./SelectColor";

const interestsHobbiesTags = [
  "Fitness",
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
  "Travel",
];

const personalityVibeTags = [
  "Minimalist",
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
  "Extroverted",
];

function PrefStyle() {
  const [budget, setBudget] = useState<number[]>([2000]) 
  const [favoriteColors, setFavoriteColors] = useState<string[]>([])

  const [selectedInterestsHobbies, setSelectedInterestsHobbies] = useState<
    string[]
  >([]);

  const handleTagToggle = (tag: string) => {
    setSelectedInterestsHobbies((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const [selectedPersonalityVibe, setSelectedPersonalityVibe] = useState<
  string[]
>([]);

const handleTagTogglePV = (tag: string) => {
  setSelectedPersonalityVibe((prev) =>
    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
  );
};


 
  return (
    <>
      <div className="flex font-bold">Interests/Hobbies</div>
      <CustomTags
        tags={interestsHobbiesTags}
        selectedTags={selectedInterestsHobbies}
        onTagToggle={handleTagToggle}
      />
      <div className="flex font-bold">Preferred Budget Range</div>
      <CustomSlider
        value={budget}
        onValueChange={(val) => setBudget(val)}
      />
      <div className="flex font-bold">Personality/Vibe</div>
      <CustomTags
        tags={personalityVibeTags}
        selectedTags={selectedPersonalityVibe}
        onTagToggle={handleTagTogglePV}
      />
      <div className="flex font-bold gap-4 items-center">Favorite Colors
      <MultiSelectColorDropdown
        selectedColors={favoriteColors}
        setSelectedColors={setFavoriteColors}
      />
      </div>
    </>
  );
}

export default PrefStyle;
