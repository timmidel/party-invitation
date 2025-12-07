import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sb-access-token")?.value;
    const refresh = cookieStore.get("sb-refresh-token")?.value;

    if (!token || !refresh) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Set session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: refresh,
    });

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch RSVPs
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch RSVPs" },
      { status: 500 }
    );
  }
}
