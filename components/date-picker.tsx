// "use client";
// import * as React from "react";
// import { ChevronDownIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Control, FieldPath, FieldValues } from "react-hook-form";
// import classNames from "classnames";

// interface CustomDatePickerProps<T extends FieldValues> {
//   control: Control<T>;
//   name: FieldPath<T>;
//   label?: string;
//   className?: string;
// }

// export function DatePicker<T extends FieldValues>({
//   control,
//   name,
//   label = "Date of Birth",
//   className,
// }: CustomDatePickerProps<T>) {
//   const [open, setOpen] = React.useState(false);
//   const [date, setDate] = React.useState<Date | undefined>(undefined);
//   return (
//     <div className="flex flex-col gap-.5">
//       <Label htmlFor="date" >
//         Date of birth
//       </Label>
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             id="date"
//             className={classNames("w-46 justify-between font-normal hover:bg-white", className)}
//           >
//             {date ? date.toLocaleDateString() : <span className="text-stone-500">Select date</span>}
//             <ChevronDownIcon />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto overflow-hidden p-0" align="start">
//           <Calendar
//             mode="single"
//             selected={date}
//             captionLayout="dropdown"
//             onSelect={(date) => {
//               setDate(date);
//               setOpen(false);
//             }}
            
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import classNames from "classnames";

interface CustomDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  className?: string;
}

export function DatePicker<T extends FieldValues>({
  control,
  name,
  label = "Date of Birth",
  className,
}: CustomDatePickerProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mt-.5 -mb-2">{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={classNames(
                    "w-46 justify-between font-normal hover:bg-white",
                    className
                  )}
                >
                  {field.value
                    ? new Date(field.value).toLocaleDateString()
                    : <span className="text-stone-500">Select date</span>}
                  <ChevronDownIcon />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
