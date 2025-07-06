import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function MobileDrawer() {
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="text-white">
            <Menu size={28} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[260px] bg-white p-4">
          <div className="space-y-4">
            <button className="w-full bg-[#0071dc] text-white py-2 rounded">Sign in or create account</button>
            <div className="text-sm space-y-3">
              <div className="flex justify-between">Language | English</div>
              <div>Walmart+</div>
              <div>Purchase History</div>
              <div>My Items</div>
              <div>Account</div>
              <div>Help</div>
              <div>Lists</div>
              <div>Registries</div>
              <div className="flex justify-between">Departments</div>
              <div className="flex justify-between">Services</div>
              <div>Give feedback</div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
