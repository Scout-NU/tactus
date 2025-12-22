import { createClient, Asset } from "contentful";
import { Document } from "@contentful/rich-text-types";

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
  preorderSectionHeading?: Document; // Rich Text
  preorderSectionDescription?: string;
}

export interface ShopPageFields {
  name?: string;
  header?: string;
  // Jacket fields
  jacketTitle?: string;
  jacketDescription?: string;
  jacketPrimaryImage?: Asset;
  jacketSecondImage?: Asset;
  jacketThirdImage?: Asset;
  jacketFourthImage?: Asset;
  jacketFullPrice?: string;
  jacketDiscountedPrice?: string;
  // Vest fields
  vestTitle?: string;
  vestDescription?: string;
  vestPrimaryImage?: Asset;
  vestSecondImage?: Asset;
  vestThirdImage?: Asset;
  vestFourthImage?: Asset;
  vestFullPrice?: string;
  vestDiscountedPrice?: string;
}

// Team member structure from JSON field
export interface ContentfulTeamMember {
  name: string;
  title: string;
  linkedin: string;
  imageAssetId: string;
}

// Sponsor link structure from JSON field
export interface ContentfulSponsorLink {
  assetID: string;
  href: string;
}

export interface AboutUsPageFields {
  name?: string;
  header?: string;
  missionText?: string;
  missionImage1?: Asset;
  missionImage2?: Asset;
  missionImage3?: Asset;
  missionImage4?: Asset;
  corePrinciplesHeading?: string;
  vinylText1?: string;
  vinylImage1?: Asset;
  vinylText2?: string;
  vinylImage2?: Asset;
  vinylText3?: string;
  vinylImage3?: Asset;
  meetTheTeamHeading?: string;
  teamMembers?: ContentfulTeamMember[];
  ourSupportersHeading?: string;
  sponsorImages?: Asset[];
  sponsorImageLinks?: { sponsors: ContentfulSponsorLink[] };
}

// Size chart row from JSON field
export interface ContentfulSizeChartRow {
  size: string;
  length: number;
  chestWidth: number;
  shoulderWidth: number;
  bottom: number;
  sleeveLength?: number; // Only jacket has this
}

// Specifications from JSON field
export interface ContentfulSpecifications {
  specifications: {
    materials: {
      outer_shell: string;
      lining: string;
      haptic_system: string;
      care: string;
    };
    tech_info: {
      connectivity: string;
      battery_life: string;
      charging: string;
      range: string;
    };
    size_chart: {
      description: string;
    };
  };
}

// Shop Product fields (shared by jacket and vest)
export interface ShopProductFields {
  name?: string;
  jacketPrimaryImage?: Asset;
  jacketSecondImage?: Asset;
  jacketThirdImage?: Asset;
  jacketFourthImage?: Asset;
  productTitle?: string;
  productDescription?: Document; // Rich Text
  aboutDescription?: Document; // Rich Text
  sizeChart?: ContentfulSizeChartRow[];
  specifications?: ContentfulSpecifications;
  featureGridLargeImage?: Asset;
  featureGridSecondImage?: Asset;
  featureGridThirdImage?: Asset;
  featureGridText1?: Document; // Rich Text
  featureGridText2?: Document; // Rich Text
  featureGridText3?: Document; // Rich Text
  featureGridText4?: Document; // Rich Text
  featureGridText5?: Document; // Rich Text
}

// ============================================
// PRESS RELEASE TYPES
// ============================================

export interface PressReleaseFields {
  title: string;
  slug: string;
  publicationDate: string;
  featuredImage: Asset;
  excerpt: string;
  externalUrl?: string;
  sourceName?: string;
  featured?: boolean;
}

// ============================================
// BLOG POST TYPES  
// ============================================

export interface BlogPostFields {
  title: string;
  slug: string;
  publicationDate: string; // Changed to match Contentful field ID
  featuredImage: Asset;
  excerpt: string;
  body: Document;
  authorName?: string;
  featured?: boolean;
  category?: string;
}

// ============================================
// COMMUNITY PAGE TYPES
// ============================================

export interface CommunityPageFields {
  name?: string;
  header?: string;
  subheader?: Document; // Rich Text
  communityImage1?: Asset;
  communityImage2?: Asset;
  communityImage3?: Asset;
  communityImage4?: Asset;
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

/**
 * Extract plain text from Contentful Rich Text Document
 * Preserves line breaks between paragraphs with \n
 */
export function richTextToPlainText(document?: Document): string | null {
  if (!document || !document.content) return null;

  const extractText = (node: unknown): string => {
    if (!node || typeof node !== "object") return "";
    
    const n = node as Record<string, unknown>;
    
    // Text node
    if (n.nodeType === "text" && typeof n.value === "string") {
      return n.value;
    }

    // Node with content array
    if (Array.isArray(n.content)) {
      return n.content.map(extractText).join("");
    }

    return "";
  };

  // Join paragraphs with newlines
  return document.content
    .map((node) => extractText(node))
    .filter((text) => text.trim() !== "")
    .join("\n");
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

/**
 * Fetch raw Shop Page fields from Contentful
 * Returns null if fetch fails - transformation happens in shopData.ts
 */
export async function fetchShopPageFields(
  preview = false
): Promise<ShopPageFields | null> {
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
      content_type: "shop",
      limit: 1,
      include: 2, // Include linked assets
    });

    if (entries.items.length === 0) {
      console.warn("⚠️ No shop page entry found in Contentful");
      return null;
    }

    return entries.items[0].fields as ShopPageFields;
  } catch (error) {
    console.error("❌ Error fetching shop page from Contentful:", error);
    return null;
  }
}

/**
 * Fetch a single asset by ID
 * Used for resolving team member images from JSON field
 */
export async function fetchAssetById(
  assetId: string,
  preview = false
): Promise<{ url: string; alt: string } | null> {
  if (
    !process.env.CONTENTFUL_SPACE_ID ||
    !process.env.CONTENTFUL_DELIVERY_KEY
  ) {
    return null;
  }

  try {
    const asset = await getClient(preview).getAsset(assetId);
    const url = asset?.fields?.file?.url;
    if (!url) return null;

    return {
      url: `https:${url}`,
      alt: (asset?.fields?.title as string) || "",
    };
  } catch (error) {
    console.error(`❌ Error fetching asset ${assetId}:`, error);
    return null;
  }
}

/**
 * Fetch multiple assets by IDs in parallel
 * More efficient for batch fetching team member images
 */
export async function fetchAssetsByIds(
  assetIds: string[],
  preview = false
): Promise<Map<string, { url: string; alt: string }>> {
  const results = new Map<string, { url: string; alt: string }>();

  if (
    !process.env.CONTENTFUL_SPACE_ID ||
    !process.env.CONTENTFUL_DELIVERY_KEY ||
    assetIds.length === 0
  ) {
    return results;
  }

  try {
    // Fetch all assets in parallel
    const assetPromises = assetIds.map((id) => fetchAssetById(id, preview));
    const assets = await Promise.all(assetPromises);

    assetIds.forEach((id, index) => {
      const asset = assets[index];
      if (asset) {
        results.set(id, asset);
      }
    });
  } catch (error) {
    console.error("❌ Error batch fetching assets:", error);
  }

  return results;
}

/**
 * Fetch raw About Us Page fields from Contentful
 * Returns null if fetch fails - transformation happens in aboutData.ts
 */
export async function fetchAboutUsPageFields(
  preview = false
): Promise<AboutUsPageFields | null> {
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
      content_type: "aboutUs",
      limit: 1,
      include: 2, // Include linked assets
    });

    if (entries.items.length === 0) {
      console.warn("⚠️ No about us page entry found in Contentful");
      return null;
    }

    return entries.items[0].fields as AboutUsPageFields;
  } catch (error) {
    console.error("❌ Error fetching about us page from Contentful:", error);
    return null;
  }
}

/**
 * Fetch Shop Product fields from Contentful (jacket or vest)
 * Uses content type "shopJacket" and filters by name to get correct entry
 * Returns null if fetch fails - transformation happens in jacketData.ts/vestData.ts
 */
export async function fetchShopProductFields(
  productType: "jacket" | "vest",
  preview = false
): Promise<ShopProductFields | null> {
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
      content_type: "shopJacket",
      include: 2, // Include linked assets
    });

    if (entries.items.length === 0) {
      console.warn("⚠️ No shop product entries found in Contentful");
      return null;
    }

    // Filter by name to find the correct entry
    const searchTerm = productType === "jacket" ? "Jacket" : "Vest";
    const matchingEntry = entries.items.find((entry) => {
      const name = (entry.fields as ShopProductFields).name || "";
      return name.includes(searchTerm);
    });

    if (!matchingEntry) {
      console.warn(`⚠️ No ${productType} entry found in Contentful`);
      return null;
    }

    return matchingEntry.fields as ShopProductFields;
  } catch (error) {
    console.error(`❌ Error fetching ${productType} from Contentful:`, error);
    return null;
  }
}

// ============================================
// PRESS RELEASE FETCHER
// ============================================

/**
 * Fetch all press releases from Contentful, sorted by publication date (newest first)
 * Returns empty array if fetch fails - transformation happens in communityData.ts
 */
export async function fetchPressReleases(
  preview = false,
  limit = 100
): Promise<PressReleaseFields[]> {
  // Guard against missing env vars
  if (
    !process.env.CONTENTFUL_SPACE_ID ||
    !process.env.CONTENTFUL_DELIVERY_KEY
  ) {
    console.warn("⚠️ Contentful environment variables not configured");
    return [];
  }

  try {
    const entries = await getClient(preview).getEntries({
      content_type: "pressRelease",
      order: ["-fields.publicationDate"],
      limit,
      include: 2, // Include linked assets
    });

    if (entries.items.length === 0) {
      console.warn("⚠️ No press releases found in Contentful");
      return [];
    }

    return entries.items.map((item) => item.fields as unknown as PressReleaseFields);
  } catch (error) {
    console.error("❌ Error fetching press releases from Contentful:", error);
    return [];
  }
}

// ============================================
// BLOG POST FETCHER
// ============================================

/**
 * Fetch all blog posts from Contentful, sorted by publish date (newest first)
 * Returns empty array if fetch fails - transformation happens in communityData.ts
 */
export async function fetchBlogPosts(
  preview = false,
  limit = 100
): Promise<BlogPostFields[]> {
  // Guard against missing env vars
  if (
    !process.env.CONTENTFUL_SPACE_ID ||
    !process.env.CONTENTFUL_DELIVERY_KEY
  ) {
    console.warn("⚠️ Contentful environment variables not configured");
    return [];
  }

  try {
    const entries = await getClient(preview).getEntries({
      content_type: "blogPost",
      order: ["-fields.publicationDate"],
      limit,
      include: 2, // Include linked assets
    });

    if (entries.items.length === 0) {
      console.warn("⚠️ No blog posts found in Contentful");
      return [];
    }

    return entries.items.map((item) => item.fields as unknown as BlogPostFields);
  } catch (error) {
    console.error("❌ Error fetching blog posts from Contentful:", error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 * Returns null if not found - for individual blog post pages
 */
export async function fetchBlogPostBySlug(
  slug: string,
  preview = false
): Promise<BlogPostFields | null> {
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
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
      include: 2,
    });

    if (entries.items.length === 0) {
      console.warn(`⚠️ No blog post found with slug: ${slug}`);
      return null;
    }

    return entries.items[0].fields as unknown as BlogPostFields;
  } catch (error) {
    console.error(`❌ Error fetching blog post ${slug}:`, error);
    return null;
  }
}

// ============================================
// COMMUNITY PAGE FETCHER
// ============================================

export async function fetchCommunityPage(
  preview = false
): Promise<CommunityPageFields | null> {
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
      content_type: "communityPage",
      limit: 1,
      include: 2, // Include linked assets
    });

    if (entries.items.length === 0) {
      console.warn("⚠️ No community page found in Contentful");
      return null;
    }

    return entries.items[0].fields as unknown as CommunityPageFields;
  } catch (error) {
    console.error("❌ Error fetching community page from Contentful:", error);
    return null;
  }
}
