import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionClient } from "@/lib/appwrite";
import { connect } from "@/dbConfig";
import { Twin } from "@/models/twinform";

export async function GET() {
  const session = (await cookies()).get("appwrite-session");
  if (!session?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { account } = await createSessionClient();
  const user = await account.get();
  
  await connect();
  const twins = await Twin.find({ userId: user.$id }, "_id title").lean();
  console.log("🔹 Returning twins for:", user.$id, "::", twins);
  return NextResponse.json(twins);
}
