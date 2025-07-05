import { cn } from "@/lib/utils";
import React from "react";
import { Check } from 'lucide-react'
import { Plus } from 'lucide-react'
interface CustomTagsProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

function CustomTags({ tags, selectedTags, onTagToggle}: CustomTagsProps) {
  return (
    <>
      <div className="flex flex-wrap justify-center -mt-4">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              className={cn(
                "px-3 py-1 m-1 rounded-full border text-sm transition-all",
                isSelected
                ? "bg-white border-green-600"
                :"bg-gray-200 border-gray-400 text-gray-800 hover:bg-gray-300"
              )}
              onClick={() => onTagToggle(tag)}
            >
              
              <div className="flex items-center ">{tag}
              {isSelected ? <Check className="text-green-600  ml-2" size={18} strokeWidth={3}/>:<Plus className="ml-2" size={16}/>}</div>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default CustomTags;
