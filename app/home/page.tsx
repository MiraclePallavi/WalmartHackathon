import React from "react";
import Homepage from "@/components/Homepage";
import { getloggedInUser } from "@/lib/action/users.action";
import { redirect } from "next/navigation";
export default async function HomePage() {
  const user = await getloggedInUser();
  if (!user) return redirect("/sign-in");
  return (
    <Homepage />
  );
}
