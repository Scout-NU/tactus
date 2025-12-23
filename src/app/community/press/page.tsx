import { fetchPressReleases, getAssetUrl, getAssetAlt } from "@/lib/contentful";
import PressListClient from "./PressListClient";

// Static fallback images
import JeremyChow from "@/app/_assets/community/press/jeremy-chow.jpg";
import DTTP from "@/app/_assets/community/press/DTTP.jpeg";
import Bostinno from "@/app/_assets/community/press/Bostinno.jpg";
import FashionUnited from "@/app/_assets/community/press/FashionUnited.avif";

export const revalidate = 3600; // 1 hour

// Static fallback press releases
const STATIC_PRESS_RELEASES = [
  {
    slug: "tactus-cic-2025",
    title: "Bringing Music to Life Through Touch: A Conversation with Tactus Founder Jeremy Chow",
    excerpt:
      "Meet Jeremy Chow, founder of Tactus, a startup redefining how deaf and hard-of-hearing individuals experience music through wearable technology.",
    publicationDate: "2025-11-03",
    featuredImageUrl: JeremyChow.src,
    featuredImageAlt: "Jeremy Chow",
    externalUrl: "https://cic.com/blog/bringing-music-to-life-through-touch-a-conversation-with-tactus-founder-jeremy-chow/",
    sourceName: "CIC",
  },
  {
    slug: "tactus-fashion-united",
    title: "How Tactus Makes Music Accessible",
    excerpt:
      "FashionUnited explores how Tactus is revolutionizing the way Deaf and hard of hearing individuals experience music through wearable technology.",
    publicationDate: "2023-03-14",
    featuredImageUrl: FashionUnited.src,
    featuredImageAlt: "Tactus fashion article",
    externalUrl:
      "https://fashionunited.in/news/fashion/how-tactus-makes-music-more-accessible-to-the-deaf-community-with-a-vibrating-shirt/2023031438946",
    sourceName: "FashionUnited",
  },
  {
    slug: "tactus-boston-innovation",
    title: "Meet Tactus, the startup behind smart clothing that translates music into vibrations",
    excerpt:
      "Boston Business Journal profiles Tactus and its innovative approach to making music accessible through haptic technology.",
    publicationDate: "2020-09-22",
    featuredImageUrl: Bostinno.src,
    featuredImageAlt: "Tactus in Boston",
    externalUrl: "https://www.bizjournals.com/boston/inno/stories/profiles/2020/09/22/exclusive-tactus-deaf-startup-smart-clothing-music.html",
    sourceName: "Boston Business Journal",
  },
  {
    slug: "tactus-dttproductions",
    title: "Tactus Music!",
    excerpt:
      "Have you ever been in a club or at a concert and you could feel the music in your chest? Well there's soon going to be a way to do that without damaging your hearing.",
    publicationDate: "2025-11-10",
    featuredImageUrl: DTTP.src,
    featuredImageAlt: "DTTP",
    externalUrl: "https://dttproductions.com/2025/11/10/tactus-music/",
    sourceName: "DTTP",
  },
];

export default async function PressListPage() {
  const releases = await fetchPressReleases();

  // If we have Contentful releases, use only those
  // Otherwise, fall back to static content
  if (releases.length > 0) {
    const contentfulReleases = releases
      .map((release) => ({
        slug: release.slug,
        title: release.title,
        excerpt: release.excerpt,
        publicationDate: release.publicationDate,
        featuredImageUrl: getAssetUrl(release.featuredImage),
        featuredImageAlt: getAssetAlt(release.featuredImage) || release.title,
        externalUrl: release.externalUrl,
        sourceName: release.sourceName,
      }))
      .sort(
        (a, b) =>
          new Date(b.publicationDate).getTime() -
          new Date(a.publicationDate).getTime()
      );

    return <PressListClient releases={contentfulReleases} />;
  }

  // No Contentful content - use static fallbacks
  return <PressListClient releases={STATIC_PRESS_RELEASES} />;
}

