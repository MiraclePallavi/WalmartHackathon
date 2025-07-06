import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const colorOptions = [
  "Multicolor", "Silver", "Gold", "White", "Black", "Yellow",
  "Blue", "Red", "Pink", "Green", "Brown", "Purple", "Gray",
  "Clear", "Orange", "Beige", "Other", "Off-White", "Assorted", "Bronze"
]

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

export default function MultiSelectColorDropdown({
  selectedColors,
  setSelectedColors
}: {
  selectedColors: string[]
  setSelectedColors: (colors: string[]) => void
}) {
  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[250px] justify-between">
          {selectedColors.length > 0
            ? `${selectedColors.length} selected`
            : "Select favorite colors"}
          <span className="ml-auto text-sm text-muted-foreground">▼</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] max-h-[250px] overflow-y-auto">
        <div className="flex flex-col gap-2">
          {colorOptions.map((color) => (
            <label
              key={color}
              className="flex items-center gap-3 text-sm cursor-pointer"
            >
              <Checkbox
                checked={selectedColors.includes(color)}
                onCheckedChange={() => toggleColor(color)}
              />
              <span
                className="w-4 h-4 rounded-full border border-gray-400"
                style={{
                  background:
                    color === "Multicolor"
                      ? colorMap[color]
                      : colorMap[color] || "#ccc"
                }}
              />
              {color}
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
