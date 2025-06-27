import React from "react";

import { Menu, ShoppingCart, User, Search, ChevronDown } from "lucide-react";
import { Input } from "./Input";
import Link from "next/link";
export default function Navbar() {
  return (<>
          <nav className="bg-[#0071dc] text-white py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg" alt="Walmart" className="h-6" />
          <div className="text-sm">
            <div className="font-bold">Pickup or delivery?</div>
            <div className="text-xs">Sacramento, 95829</div>
          </div>
        </div>
        <div className="flex items-center w-1/2 bg-white rounded-full overflow-hidden">
          <Input
            type="text"
            placeholder="Search everything at Walmart online and in store"
            className="rounded-xl px-4 py-2 w-full text-black"
          />
          <button className="bg-blue-700 px-4 rounded-full h-10 cursor-pointer">
            <Search size={20} />
          </button>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <div className="flex flex-col items-center">
            <span>Reorder</span>
            <span className="font-bold">My Items</span>
          </div>
          <Link href="/sign-in">
          <div className="flex flex-col items-center hover:bg-blue-800 p-2 rounded-full cursor-pointer">
            
            <span >Sign In</span>
            <span className="font-bold">Account</span>
           
          </div>
           </Link>
          <div className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 text-xs bg-yellow-400 text-black rounded-full px-1">0</span>
          </div>
        </div>
      </nav>

      <div className="bg-white text-sm px-4 py-2 flex items-center gap-4 border-b border-gray-200">
        <span className="font-bold flex items-center gap-1">Departments <ChevronDown size={14} /></span>
        <span className="font-bold flex items-center gap-1">Services <ChevronDown size={14} /></span>
        <span>Get it Fast</span>
        <span>New Arrivals</span>
        <span>Pharmacy Delivery</span>
        <span>Dinner Solutions</span>
        <span className="text-red-600 font-bold">4th of July</span>
        <span>Trending</span>
        <span>Back to School</span>
        <span>My Items</span>
        <span>Auto Service</span>
        <span>Walmart+</span>
        <span className="flex items-center gap-1">More <ChevronDown size={14} /></span>
      </div>
      </>
  );
}