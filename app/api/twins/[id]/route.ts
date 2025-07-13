import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionClient } from "@/lib/appwrite";
import { connect } from "@/dbConfig";
import { Twin } from "@/models/twinform";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = (await cookies()).get("appwrite-session");
  if (!session?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { account } = await createSessionClient();
  const user = await account.get();

  await connect();
  // ensure the twin belongs to that user
  const twin = await Twin.findOne({ _id: params.id, userId: user.$id }).lean();
  if (!twin) {
    return NextResponse.json({ error: "Twin not found" }, { status: 404 });
  }
  return NextResponse.json(twin);
}
