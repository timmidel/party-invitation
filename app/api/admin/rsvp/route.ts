import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

async function authenticate() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;
  const refresh = cookieStore.get("sb-refresh-token")?.value;

  if (!token || !refresh) {
    return null;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: refresh,
  });

  if (error || !user) {
    return null;
  }

  return user;
}

export async function GET(request: Request) {
  try {
    const user = await authenticate();
    if (!user) {
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

export async function PUT(request: Request) {
  try {
    const user = await authenticate();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, attendance, guests } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing RSVP ID" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("rsvps")
      .update({ attendance, guests: JSON.stringify(guests) })
      .match({ id });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update RSVP" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await authenticate();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing RSVP ID" }, { status: 400 });
    }

    const { data, error } = await supabase.from("rsvps").delete().match({ id });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete RSVP" },
      { status: 500 }
    );
  }
}
