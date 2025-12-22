import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Content type to route mapping (future-proofed for all pages)
const CONTENT_TYPE_TO_PATH: Record<string, string> = {
  homepage: "/",
  aboutPage: "/about",
  shopPage: "/shop",
  jacketPage: "/shop/jacket",
  vestPage: "/shop/vest",
  communityPage: "/community",
  blogPost: "/community",
  pressItem: "/community",
};

export async function POST(request: NextRequest) {
  // Verify the webhook secret
  const secret = request.headers.get("X-Contentful-Webhook-Secret");
  const expectedSecret = process.env.CONTENTFUL_REVALIDATE_SECRET;

  if (!expectedSecret) {
    console.error("❌ CONTENTFUL_REVALIDATE_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  if (secret !== expectedSecret) {
    console.error("❌ Invalid webhook secret");
    return NextResponse.json(
      { error: "Invalid webhook secret" },
      { status: 401 }
    );
  }

  try {
    // Parse the webhook payload
    const payload = await request.json();

    // Extract content type from Contentful's payload structure
    const contentType = payload?.sys?.contentType?.sys?.id;

    if (!contentType) {
      console.error("❌ No content type found in webhook payload");
      return NextResponse.json(
        { error: "No content type in payload" },
        { status: 400 }
      );
    }

    // Get the path to revalidate
    const pathToRevalidate = CONTENT_TYPE_TO_PATH[contentType];

    if (!pathToRevalidate) {
      console.warn(`⚠️ Unknown content type: ${contentType}`);
      return NextResponse.json(
        { error: `Unknown content type: ${contentType}` },
        { status: 400 }
      );
    }

    // Revalidate the path
    revalidatePath(pathToRevalidate);

    console.log(`✅ Revalidated path: ${pathToRevalidate} (content type: ${contentType})`);

    return NextResponse.json({
      revalidated: true,
      path: pathToRevalidate,
      contentType,
    });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}

// Handle GET requests for health checks
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Contentful revalidation webhook endpoint",
  });
}

