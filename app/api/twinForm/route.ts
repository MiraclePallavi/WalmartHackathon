import {twinFullSchema} from "@/lib/validation";
import { Twin } from "@/models/twinform";
import {NextResponse, NextRequest} from "next/server";
import { connect } from "@/dbConfig";
import {cookies} from "next/headers";
import {createSessionClient} from "@/lib/appwrite";

export async function POST(req: Request) {
  try {
    console.log("🟡 Incoming request to /api/twinForm");

    const session = (await cookies()).get("appwrite-session");
    if (!session || !session.value) {
      console.warn("🔴 No session found");
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    console.log("✅ Session found");

    const { account } = await createSessionClient();
    const user = await account.get();
    console.log("✅ User fetched:", user?.$id);

    const body = await req.json();
    console.log("📦 Request body:", body);

    const validatedData = twinFullSchema.parse(body);
    console.log("✅ Data validated");

    await connect();
    console.log("✅ DB connected");

    const newEntry = await Twin.create({ ...validatedData, userId: user.$id });
    console.log("✅ Entry saved:", newEntry);

    return NextResponse.json(
      {
        message: "Data stored successfully",
        newEntry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error in POST /api/twinForm:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
