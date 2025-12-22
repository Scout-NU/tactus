import { createClient, Asset } from "contentful";

// ============================================
// CONTENTFUL CLIENT SETUP
// ============================================

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_KEY!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_KEY!,
  host: "preview.contentful.com",
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

export const getClient = (preview = false) =>
  preview ? previewClient : client;

// ============================================
// RAW CONTENTFUL TYPES (matching Contentful model)
// ============================================

export interface HomepageFields {
  name?: string;
  heroText?: string;
  highlightedHeroText?: string;
  heroSubtext?: string;
  heroButtonText?: string;
  heroProductImage?: Asset;
  videoSectionHeader?: string;
  videoSectionQuote?: string;
  firstVideo?: Asset;
  firstVideoThumbnail?: Asset;
  secondVideo?: Asset;
  secondVideoThumbnail?: Asset;
  thirdVideo?: Asset;
  thirdVideoThumbnail?: Asset;
  fourthVideo?: Asset;
  fourthVideoThumbnail?: Asset;
  sponsorImages?: Asset[];
  productSectionHeader?: string;
  productSectionSubtext?: string;
  jacketFullPrice?: string;
  jacketDiscountedPrice?: string;
  vestFullPrice?: string;
  vestDiscountedPrice?: string;
  jacketName?: string;
  vestName?: string;
}

export interface ProductPageFields {
  name?: string;
  header?: string;
  subheader?: string;
  productImage?: Asset;
  popup1Heading?: string;
  popup1Description?: string;
  popup2Heading?: string;
  popup2Description?: string;
  popup3Heading?: string;
  popup3Description?: string;
  popup4Heading?: string;
  popup4Description?: string;
  popup5Heading?: string;
  popup5Description?: string;
  preorderSectionHeading?: string;
  preorderSectionDescription?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get URL from Contentful Asset
 */
export function getAssetUrl(asset?: Asset): string | null {
  if (!asset?.fields?.file?.url) return null;
  return `https:${asset.fields.file.url}`;
}

/**
 * Get asset title/description for alt text
 */
export function getAssetAlt(asset?: Asset): string {
  return (
    (asset?.fields?.title as string) ||
    (asset?.fields?.description as string) ||
    ""
  );
}

// ============================================
// RAW DATA FETCHER
// ============================================

/**
 * Fetch raw Homepage fields from Contentful
 * Returns null if fetch fails - transformation happens in homeData.ts
 */
export async function fetchHomepageFields(
  preview = false
): Promise<HomepageFields | null> {
  // Guard against missing env vars
  if (
    !process.env.CONTENTFUL_SPACE_ID ||
    !process.env.CONTENTFUL_DELIVERY_KEY
  ) {
    console.warn("⚠️ Contentful environment variables not configured");
    return null;
  }

  try {
    const entries = await getClient(preview).getEntries({
      content_type: "homepage",
      limit: 1,
      include: 2, // Include linked assets
    });

    if (entries.items.length === 0) {
      console.warn("⚠️ No homepage entry found in Contentful");
      return null;
    }

    return entries.items[0].fields as HomepageFields;
  } catch (error) {
    console.error("❌ Error fetching homepage from Contentful:", error);
    return null;
  }
}

/**
 * Fetch raw Product Page fields from Contentful
 * Returns null if fetch fails - transformation happens in productData.ts
 */
export async function fetchProductPageFields(
  preview = false
): Promise<ProductPageFields | null> {
  // Guard against missing env vars
  if (
    !process.env.CONTENTFUL_SPACE_ID ||
    !process.env.CONTENTFUL_DELIVERY_KEY
  ) {
    console.warn("⚠️ Contentful environment variables not configured");
    return null;
  }

  try {
    const entries = await getClient(preview).getEntries({
      content_type: "product",
      limit: 1,
      include: 2, // Include linked assets
    });

    if (entries.items.length === 0) {
      console.warn("⚠️ No product page entry found in Contentful");
      return null;
    }

    return entries.items[0].fields as ProductPageFields;
  } catch (error) {
    console.error("❌ Error fetching product page from Contentful:", error);
    return null;
  }
}
