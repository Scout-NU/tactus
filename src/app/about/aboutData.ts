import type { StaticImageData } from "next/image";
import {
  fetchAboutUsPageFields,
  fetchAssetsByIds,
  getAssetUrl,
  getAssetAlt,
} from "@/lib/contentful";

// Mission photos (static fallbacks)
import mission1 from "@/app/_assets/about/mission/jeremy-with-community.jpg";
import mission2 from "@/app/_assets/about/mission/our-mission-2.png";
import mission3 from "@/app/_assets/about/mission/our-mission-3.png";
import mission4 from "@/app/_assets/about/mission/jeremy-deaflympics-community.jpg";

// Vinyl covers (static fallbacks)
import vinylCover1 from "@/app/_assets/about/vinyl/vinyl-cover-1.jpg";
import vinylCover2 from "@/app/_assets/about/vinyl/jeremy-holding-sign.jpg";
import vinylCover3 from "@/app/_assets/about/vinyl/vinyl-cover-3.jpg";

// Team photos (static fallbacks)
import jeremyTeam from "@/app/_assets/about/team/jeremy-team.png";
import johanTeam from "@/app/_assets/about/team/johan-team.png";
import alexTeam from "@/app/_assets/about/team/alex-team.png";
import cayleTeam from "@/app/_assets/about/team/cayle-team.png";
import antoinetteTeam from "@/app/_assets/about/team/antoinette-team.png";
import nicholasTeam from "@/app/_assets/about/team/nicholas-team.png";

// Sponsor images (static fallbacks)
import sponsor1 from "@/app/_assets/shared/sponsor-images/sponsor-1.png";
import sponsor2 from "@/app/_assets/shared/sponsor-images/sponsor-2.png";
import sponsor3 from "@/app/_assets/shared/sponsor-images/sponsor-3.png";
import sponsor4 from "@/app/_assets/shared/sponsor-images/sponsor-4.png";
import sponsor5 from "@/app/_assets/shared/sponsor-images/sponsor-5.png";
import sponsor6 from "@/app/_assets/shared/sponsor-images/sponsor-6.png";
import sponsor7 from "@/app/_assets/shared/sponsor-images/sponsor-7.png";
import sponsor8 from "@/app/_assets/shared/sponsor-images/sponsor-8.png";
import sponsor9 from "@/app/_assets/shared/sponsor-images/sponsor-9.png";
import sponsor10 from "@/app/_assets/shared/sponsor-images/sponsor-10.png";
import sponsor11 from "@/app/_assets/shared/sponsor-images/sponsor-11.png";
import sponsor12 from "@/app/_assets/shared/sponsor-images/sponsor-12.png";
import sponsor13 from "@/app/_assets/shared/sponsor-images/sponsor-13.png";
import sponsor14 from "@/app/_assets/shared/sponsor-images/sponsor-14.png";

// ============================================
// TYPES
// ============================================

export type TeamMember = {
  name: string;
  role: string;
  image: StaticImageData | string;
  linkedinUrl: string;
};

export type Principle = {
  title: string;
  vinylCover: StaticImageData | string;
};

export type MissionPhoto = {
  src: StaticImageData | string;
  zIndex: number;
};

export type Sponsor = {
  src: StaticImageData | string;
  alt: string;
  href?: string;
};

export type AboutPageData = {
  mission: {
    label: string;
    heading: string;
  };
  missionPhotos: MissionPhoto[];
  principles: {
    heading: string;
    items: Principle[];
  };
  team: {
    heading: string;
    members: TeamMember[];
  };
  sponsors: {
    heading: string;
    items: Sponsor[];
  };
  contact: {
    heading: string;
    description: string;
    ctaText: string;
  };
};

// ============================================
// STATIC FALLBACK CONTENT
// ============================================

const STATIC_CONTENT = {
  mission: {
    label: "Our Mission",
    heading:
      "TO PROVIDE A NEW WAY FOR DEAF AND HARD OF HEARING INDIVIDUALS TO ENJOY MUSIC AND CONNECT WITH ONE ANOTHER.",
  },
  principles: {
    heading: "THE CORE PRINCIPLES",
  },
  team: {
    heading: "MEET THE TEAM",
  },
  sponsors: {
    heading: "OUR SUPPORTERS",
  },
  contact: {
    heading: "DON'T MISS A BEAT",
    description: "Stay connected for early access to news from the Tactus team.",
    ctaText: "STAY IN TOUCH",
  },
} as const;

const STATIC_MISSION_PHOTOS: MissionPhoto[] = [
  { src: mission1, zIndex: 40 },
  { src: mission2, zIndex: 39 },
  { src: mission3, zIndex: 38 },
  { src: mission4, zIndex: 37 },
];

const STATIC_PRINCIPLES: Principle[] = [
  { title: "Embrace Music", vinylCover: vinylCover1 },
  { title: "Empower Connection", vinylCover: vinylCover2 },
  { title: "Celebrate Inclusion", vinylCover: vinylCover3 },
];

const STATIC_TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Jeremy Chow",
    role: "Founder",
    image: jeremyTeam,
    linkedinUrl: "https://www.linkedin.com/in/jeremy-py-chow/",
  },
  {
    name: "Johan Darboven",
    role: "Strategy Director",
    image: johanTeam,
    linkedinUrl: "https://www.linkedin.com/in/johann-arthur-darboven-a01275196/",
  },
  {
    name: "Alex Crist",
    role: "Lead Software Engineer",
    image: alexTeam,
    linkedinUrl: "https://www.linkedin.com/in/alex-crist/",
  },
  {
    name: "Cayle O'Brien",
    role: "Staff Interpreter",
    image: cayleTeam,
    linkedinUrl: "https://www.linkedin.com/in/cayle-o-brien-ms-nic-b69a68211/",
  },
  {
    name: "Antoinette Chow",
    role: "Designer",
    image: antoinetteTeam,
    linkedinUrl: "https://www.linkedin.com/in/antoinette-chow/",
  },
  {
    name: "Nicholas Chow",
    role: "Product Engineer",
    image: nicholasTeam,
    linkedinUrl: "https://www.linkedin.com/in/nptchow/",
  },
];

const STATIC_SPONSORS: Sponsor[] = [
  { src: sponsor1, alt: "Sponsor 1" },
  { src: sponsor2, alt: "Sponsor 2" },
  { src: sponsor3, alt: "Sponsor 3" },
  {
    src: sponsor4,
    alt: "Sponsor 4",
    href: "https://www.bizjournals.com/boston/inno/stories/profiles/2020/09/22/exclusive-tactus-deaf-startup-smart-clothing-music.html",
  },
  { src: sponsor5, alt: "Sponsor 5" },
  { src: sponsor6, alt: "Sponsor 6" },
  { src: sponsor11, alt: "Sponsor 11" },
  { src: sponsor7, alt: "Sponsor 7" },
  { src: sponsor8, alt: "Sponsor 8" },
  {
    src: sponsor9,
    alt: "Sponsor 9",
    href: "https://cic.com/blog/bringing-music-to-life-through-touch-a-conversation-with-tactus-founder-jeremy-chow/",
  },
  {
    src: sponsor10,
    alt: "Sponsor 10",
    href: "https://drive.google.com/file/d/1V4Z2YlX6ZHufJGKbVSVu6fP_SNiRcR-O/view?usp=sharing",
  },
  {
    src: sponsor12,
    alt: "Sponsor 12",
    href: "https://dttproductions.com/2025/11/10/tactus-music/",
  },
  { src: sponsor13, alt: "Sponsor 13" },
  {
    src: sponsor14,
    alt: "Sponsor 14",
    href: "https://fashionunited.com/news/fashion/how-tactus-makes-music-more-accessible-to-the-deaf-community-with-a-vibrating-shirt/2023031452805",
  },
];

// ============================================
// DATA FETCHER
// ============================================

export async function getAboutPageData(): Promise<AboutPageData> {
  // Fetch from Contentful
  const fields = await fetchAboutUsPageFields();

  // If no Contentful data, return static fallbacks
  if (!fields) {
    return {
      mission: {
        label: STATIC_CONTENT.mission.label,
        heading: STATIC_CONTENT.mission.heading,
      },
      missionPhotos: STATIC_MISSION_PHOTOS,
      principles: {
        heading: STATIC_CONTENT.principles.heading,
        items: STATIC_PRINCIPLES,
      },
      team: {
        heading: STATIC_CONTENT.team.heading,
        members: STATIC_TEAM_MEMBERS,
      },
      sponsors: {
        heading: STATIC_CONTENT.sponsors.heading,
        items: STATIC_SPONSORS,
      },
      contact: { ...STATIC_CONTENT.contact },
    };
  }

  // Build mission photos from Contentful
  const missionImageFields = [
    fields.missionImage1,
    fields.missionImage2,
    fields.missionImage3,
    fields.missionImage4,
  ];
  const missionPhotos: MissionPhoto[] = missionImageFields.map((asset, index) => {
    const url = getAssetUrl(asset);
    return {
      src: url || STATIC_MISSION_PHOTOS[index].src,
      zIndex: 40 - index, // 40, 39, 38, 37
    };
  });

  // Build principles from Contentful
  const vinylImageFields = [fields.vinylImage1, fields.vinylImage2, fields.vinylImage3];
  const vinylTextFields = [fields.vinylText1, fields.vinylText2, fields.vinylText3];
  const principles: Principle[] = vinylTextFields.map((text, index) => ({
    title: text || STATIC_PRINCIPLES[index].title,
    vinylCover: getAssetUrl(vinylImageFields[index]) || STATIC_PRINCIPLES[index].vinylCover,
  }));

  // Build team members from Contentful (with async asset resolution)
  let teamMembers: TeamMember[] = STATIC_TEAM_MEMBERS;
  if (fields.teamMembers && Array.isArray(fields.teamMembers) && fields.teamMembers.length > 0) {
    // Collect all asset IDs for batch fetching
    const assetIds = fields.teamMembers
      .map((member) => member.imageAssetId)
      .filter((id): id is string => !!id);

    // Fetch all team member images in parallel
    const assetMap = await fetchAssetsByIds(assetIds);

    teamMembers = fields.teamMembers.map((member, index) => {
      const asset = assetMap.get(member.imageAssetId);
      return {
        name: member.name,
        role: member.title,
        image: asset?.url || STATIC_TEAM_MEMBERS[index]?.image || jeremyTeam,
        linkedinUrl: member.linkedin,
      };
    });
  }

  // Build sponsors from Contentful
  let sponsors: Sponsor[] = STATIC_SPONSORS;
  if (fields.sponsorImages && Array.isArray(fields.sponsorImages) && fields.sponsorImages.length > 0) {
    // Create a map of assetID to href from sponsorImageLinks
    const linkMap = new Map<string, string>();
    if (fields.sponsorImageLinks?.sponsors) {
      fields.sponsorImageLinks.sponsors.forEach((link) => {
        linkMap.set(link.assetID, link.href);
      });
    }

    sponsors = fields.sponsorImages.map((asset, index) => {
      const url = getAssetUrl(asset);
      const alt = getAssetAlt(asset) || `Sponsor ${index + 1}`;
      // Get the asset's sys.id to match with links
      const assetId = (asset as { sys?: { id?: string } })?.sys?.id;
      const href = assetId ? linkMap.get(assetId) : undefined;

      return {
        src: url || STATIC_SPONSORS[index]?.src || sponsor1,
        alt,
        href,
      };
    });
  }

  return {
    mission: {
      label: fields.header || STATIC_CONTENT.mission.label,
      heading: fields.missionText || STATIC_CONTENT.mission.heading,
    },
    missionPhotos,
    principles: {
      heading: fields.corePrinciplesHeading || STATIC_CONTENT.principles.heading,
      items: principles,
    },
    team: {
      heading: fields.meetTheTeamHeading || STATIC_CONTENT.team.heading,
      members: teamMembers,
    },
    sponsors: {
      heading: fields.ourSupportersHeading || STATIC_CONTENT.sponsors.heading,
      items: sponsors,
    },
    contact: { ...STATIC_CONTENT.contact },
  };
}
