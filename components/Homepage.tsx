"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User, Search, ChevronDown } from "lucide-react";
import MobileDrawer from "./MobileDrawer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
interface TwinSummary {
  _id: string;
  title: string;
}
export default function Homepage() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [twins, setTwins] = useState<TwinSummary[]>([]);
  
     useEffect(() => {
  fetch("/api/twins", {
    credentials: "include"          
  })
    .then((res) => {
      if (!res.ok) {
        console.error("twins fetch failed:", res.status);
        return [];
      }
      return res.json();
    })
    .then((data: TwinSummary[]) => {
      setTwins(data);
    })
    .catch(console.error);
}, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      dropdownRef.current &&
      !(dropdownRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
      setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      dropdownRef.current &&
      !(dropdownRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
      setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="font-sans bg-[#f5f6f6] min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#0071dc] text-white py-2 px-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="md:hidden">
            <MobileDrawer />
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg"
            alt="Walmart"
            className="h-6"
          />
          <div className="text-sm hidden sm:block">
            <div className="font-bold">Pickup or delivery?</div>
            <div className="text-xs">Sacramento, 95829</div>
          </div>
        </div>

        <div className="flex items-center w-full md:w-1/2 bg-white rounded-full overflow-hidden">
          <Input
            type="text"
            placeholder="Search everything at Walmart online and in store"
            className="rounded-xl px-4 py-2 w-full text-black"
          />
          <button className="bg-blue-700 px-4 rounded-full h-10 cursor-pointer">
            <Search size={20} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs">
          <div className="flex flex-col items-center">
            <span>Reorder</span>
            <span className="font-bold">My Items</span>
          </div>

          <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        className="flex flex-col items-center hover:bg-blue-800 p-2 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Image
          src="/profileIcon.svg"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-white text-sm mt-1">Profile</span>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
          <ul className="py-2 text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Profile</li>
            <Link href="/twin/create">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Create Twin</li>
            </Link>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>
   <div className="relative group inline-block">
  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-medium rounded-lg shadow transition-all duration-200">
    Shop for…
    <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
  </button>

  <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-xl ring-1 ring-black/5 z-20 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transform origin-top-right transition-all duration-200">
    {twins.length === 0 ? (
      <div className="p-3 text-sm text-center text-gray-500">No twins yet</div>
    ) : (
      <ul className="divide-y divide-gray-200">
        {twins.map((t) => (
          <li key={t._id}>
            <Link
              href={`/twins/${t._id}`}
              className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
            >
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
          <div className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 text-xs bg-yellow-400 text-black rounded-full px-1">
              0
            </span>
          </div>
        </div>

        {/* User options - visible only on small screens */}
        <div className="flex md:hidden justify-between text-xs mt-2">
          <div className="flex flex-col items-center">
            <span>Reorder</span>
            <span className="font-bold">My Items</span>
          </div>
          <div className="flex flex-col items-center">
            <span>Sign In</span>
            <span className="font-bold">Account</span>
          </div>
        </div>
      </nav>

      {/* Secondary nav */}
      <div className="bg-white text-sm px-4 py-2 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
  <div className="flex items-center gap-4 w-max">
    <span className="font-bold flex items-center gap-1">
      Departments <ChevronDown size={14} />
    </span>
    <span className="font-bold flex items-center gap-1">
      Services <ChevronDown size={14} />
    </span>
    <span>Get it Fast</span>
    <span>New Arrivals</span>
    <span>Pharmacy Delivery</span>
    <span>Dinner Solutions</span>
    <span className="text-red-600 font-bold">4th of July</span>
    <span>Trending</span>
    <span>Back to School</span>
    <span className="hidden sm:inline">My Items</span>
    <span className="hidden sm:inline">Auto Service</span>
    <span className="hidden sm:inline">Walmart+</span>
    <span className="flex items-center gap-1">
      More <ChevronDown size={14} />
    </span>
  </div>
</div>5

      {/* Content */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div className="bg-white rounded-lg overflow-hidden">
          <img
            src="/neckband.jpg"
            alt="high quality neckband"
            className="w-full h-auto"
          />
          <div className="p-2 text-sm font-semibold">boAt Rockerz 109 & more</div>
          <a href="#" className="text-blue-600 text-sm px-2">
            Shop now
          </a>
        </div>
        <div className="col-span-1 sm:col-span-2 bg-blue-100 rounded-lg p-4 flex flex-col gap-4">
          <div className="text-xl font-bold">Hot July 14th savings</div>
          <div className="text-sm">Get it in as fast as an hour*</div>
          <button className="bg-white text-black px-4 py-1 w-max border rounded">
            Shop now
          </button>
          <div className="flex justify-around flex-wrap gap-2">
            <img
              src="/camera.jpg"
              alt="Chair"
              className="h-24"
            />
            <img
              src="/cetaphil.jpg"
              alt="Action Figure"
              className="h-24"
            />
            <img
              src="/boat Stone.jpg"
              alt="Sunglasses"
              className="h-24"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden">
          <img
            src="/laptop.jpg"
            alt="La Roche"
            className="w-full h-auto"
          />
          <div className="p-2 text-sm font-semibold">
            25% off La Roche-Posay, now—6/28
          </div>
          <a href="#" className="text-blue-600 text-sm px-2">
            Shop now
          </a>
        </div>
      </main>
    </div>
  );
}