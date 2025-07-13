
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import { Twin } from "@/models/twinform";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connect();
  const twin = await Twin.findById(params.id).lean();
  if (!twin) {
    return NextResponse.json({ error: "Twin not found" }, { status: 404 });
  }
  return NextResponse.json(twin);
}
