export type CommunityPageData = {
  hero: {
    heading: string;
    highlightedWord: string;
    description: string;
  };
  status: {
    text: string;
    ctaText: string;
    ctaLink: string;
  };
};

const STATIC_CONTENT = {
  hero: {
    heading: "JOIN THE",
    highlightedWord: "TACTUS",
    headingSuffix: "COMMUNITY",
    description:
      "Connect with others who are experiencing music in revolutionary new ways. Share your stories, discover events, and be part of a movement that's making music accessible to everyone.",
  },
  status: {
    text: "Coming Soon",
    ctaText: "BACK TO HOME",
    ctaLink: "/",
  },
} as const;

export async function getCommunityPageData(): Promise<CommunityPageData> {
  return {
    hero: {
      heading: `${STATIC_CONTENT.hero.heading} ${STATIC_CONTENT.hero.highlightedWord} ${STATIC_CONTENT.hero.headingSuffix}`,
      highlightedWord: STATIC_CONTENT.hero.highlightedWord,
      description: STATIC_CONTENT.hero.description,
    },
    status: {
      text: STATIC_CONTENT.status.text,
      ctaText: STATIC_CONTENT.status.ctaText,
      ctaLink: STATIC_CONTENT.status.ctaLink,
    },
  };
}

