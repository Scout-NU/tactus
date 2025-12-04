import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

interface CartItem {
  productId: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
  image?: string;
  stripePriceId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    if (!body) {
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }

    const { items } = JSON.parse(body);

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Convert cart items to Stripe line items
    const lineItems = items.map((item: CartItem) => {
      // If we have a Stripe Price ID, use it
      if (item.stripePriceId) {
        return {
          price: item.stripePriceId,
          quantity: item.quantity,
        };
      }

      // Convert relative image path to absolute URL for Stripe
      const imageUrl = item.image?.startsWith('http') 
        ? item.image 
        : item.image 
          ? `${req.headers.get("origin")}${item.image}`
          : undefined;

      // Otherwise, create a price on the fly
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            description: `Size: ${item.size}`,
            images: imageUrl ? [imageUrl] : [],
          },
          unit_amount: item.price, // Price in cents
        },
        quantity: item.quantity,
      };
    });

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/shop`,
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ["AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
