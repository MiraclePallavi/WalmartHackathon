import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { params } = await context;
  const twinId = params.id;
  const res = await fetch("http://127.0.0.1:8001/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ twin_id: twinId, top_k: 5 }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Recommendation service error" },
      { status: 502 }
    );
  }

  const recommendations = await res.json();
  return NextResponse.json(recommendations);
}
