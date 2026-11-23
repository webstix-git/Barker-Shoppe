import { NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/turnstile";

/** Server-only — never import this into client components. */
const FORM_SUBMIT_URL =
  "https://ywwxvriolxwuqcwjaluh.supabase.co/functions/v1/form-submit/bb1e05aa-a973-435b-b972-b0cf3c2718c8";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  petName?: string;
  service?: string;
  message?: string;
  turnstileToken?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const captcha = await verifyTurnstileToken(
    String(body.turnstileToken ?? ""),
    request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      null,
  );
  if (!captcha.ok) {
    return NextResponse.json({ success: false, error: captcha.error }, { status: 400 });
  }

  const payload = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    petName: String(body.petName ?? "").trim(),
    service: String(body.service ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };

  if (!payload.name || !payload.email || !payload.phone || !payload.service) {
    return NextResponse.json(
      { success: false, error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(FORM_SUBMIT_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    let data: { success?: boolean; redirect_url?: string; error?: string } = {};
    try {
      data = (await upstream.json()) as typeof data;
    } catch {
      data = {};
    }

    if (!upstream.ok || data.success === false) {
      return NextResponse.json(
        {
          success: false,
          error: data.error || "We couldn’t send your message. Please try again or call us.",
        },
        { status: upstream.status >= 400 ? upstream.status : 502 },
      );
    }

    return NextResponse.json({
      success: true,
      redirect_url: data.redirect_url || "/thank-you",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "We couldn’t send your message. Please try again or call us.",
      },
      { status: 502 },
    );
  }
}
