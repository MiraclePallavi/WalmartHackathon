import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

export function CustomSlider({ className, ...props }: SliderProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 px-1 text-sm text-gray-500">
        <span>₹{props.min ?? 100}</span>
        <span>₹{props.max ?? 10000}</span>
      </div>
      <Slider
        value={props.value}
        onValueChange={props.onValueChange}
        defaultValue={[2000]}
        max={props.max ?? 10000}
        min={props.min ?? 100}
        step={props.step ?? 100}
        className={cn("w-full", className)}
        {...props}
      />
    </div>
  );
}
