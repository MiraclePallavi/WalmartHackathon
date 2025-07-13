
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import { Twin } from "@/models/twinform";

export async function GET() {
  await connect();
  const twins = await Twin.find({}, "_id title");
  return NextResponse.json(twins);
}
