import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Content type to route mapping
// Note: Some content types map to multiple paths (e.g., shopJacket -> jacket & vest)
const CONTENT_TYPE_TO_PATHS: Record<string, string[]> = {
  homepage: ["/"],
  product: ["/product"],
  aboutUs: ["/about"],
  shop: ["/shop"],
  shopJacket: ["/shop/jacket", "/shop/vest"], // Both use same content type
  communityPage: ["/community"],
  blogPost: ["/community"],
  pressItem: ["/community"],
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

    // Get the paths to revalidate
    const pathsToRevalidate = CONTENT_TYPE_TO_PATHS[contentType];

    if (!pathsToRevalidate || pathsToRevalidate.length === 0) {
      console.warn(`⚠️ Unknown content type: ${contentType}`);
      return NextResponse.json(
        { error: `Unknown content type: ${contentType}` },
        { status: 400 }
      );
    }

    // Revalidate all paths for this content type
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
      console.log(`✅ Revalidated path: ${path} (content type: ${contentType})`);
    }

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
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

