import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

// Static blog post data for fallback when Contentful is unavailable
export type StaticBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publicationDate: string;
  authorName?: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string;
  body: Document;
};

// Rich text document for Prof. Laurie Achin blog post
const laurieAchinBody: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "In our pursuit of making music accessible and inclusive for the Deaf community, we embarked on an inspiring collaboration with Prof. Laurie Achin, a Deaf professor, dancer, and choreographer. This remarkable journey began at Northeastern University, where our team of passionate engineering students discovered Prof. Laurie Achin's unique experience with music despite her hearing impairment.",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "At first, Prof. Laurie Achin relied on a combination of methods to experience music. She used hearing aids and headphones, watched music videos, read lyrics, and even felt the vibrations of the music from speakers through her hands. However, we were determined to create a solution that would offer her a more immersive and comprehensive music experience.",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "Our collaboration with Prof. Laurie Achin unfolded through regular meetings, where we shared prototype samples and eagerly gathered her invaluable feedback. We learned that she responded particularly well to the vibrations of music, prompting us to develop a wearable device that would translate audible music into carefully calibrated vibrations felt on her body. With her expertise as a dancer and choreographer, Prof. Laurie Achin played a crucial role in ensuring the device's comfort and freedom of movement, allowing her to dance and express herself uninhibitedly.",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "The collaboration was not without its challenges, but they served as valuable lessons. We recognized the importance of including user testing in our research and embracing feedback from our target users. The collaboration illuminated the cultural nuances of the Deaf community and guided us in positioning the technology appropriately.",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "The results were extraordinary. The wearable device we developed, a vibrational vest, enabled Prof. Laurie Achin to experience music in a whole new way while dancing. By choosing her desired songs, the device conveyed vibrations to different targeted locations on her torso, allowing her to synchronize her movements with the beat, rhythm, and melody of the music. The technology became an extension of her artistic expression, enhancing her connection with music and enabling her to share the experience with her daughter.",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "This collaboration has profoundly shaped our mission and approach to developing innovative solutions for the Deaf community. Prof. Laurie Achin's encouragement and involvement have fueled our dedication to making music more inclusive and accessible. We have embraced the philosophy of working not only for the Deaf community but with the Deaf community. This ongoing collaboration serves as a guiding principle, ensuring that our wearable devices and technologies are truly designed to meet the diverse needs and aspirations of the Deaf community.",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "As we continue our journey, we are grateful for the support and inspiration provided by Prof. Laurie Achin. Together, we are making music more inclusive and making the transformative power of music more accessible.",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.HR,
      data: {},
      content: [],
    },
    {
      nodeType: BLOCKS.HEADING_3,
      data: {},
      content: [
        {
          nodeType: "text",
          value: "Check out Prof. Laurie Achin's other work and involvement in the Deaf community:",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: "Prof. Laurie Achin is currently a Lecturer at the ",
          marks: [],
          data: {},
        },
        {
          nodeType: INLINES.HYPERLINK,
          data: { uri: "https://people.coe.uga.edu/laurie-achin" },
          content: [
            {
              nodeType: "text",
              value: "University of Georgia",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "text",
          value: ".",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "She was an ASL consultant for The Walking Dead (seasons 10-11) and also did ASL consulting for the film, I'll Sleep When You're Dead, for which she was also a co-producer as well as an actress. View her ",
          marks: [],
          data: {},
        },
        {
          nodeType: INLINES.HYPERLINK,
          data: { uri: "https://www.imdb.com/name/nm12807026/?ref_=nmbio_bio_nm" },
          content: [
            {
              nodeType: "text",
              value: "IMDB profile",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "text",
          value: ".",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: "Prof. Laurie Achin is currently the ",
          marks: [],
          data: {},
        },
        {
          nodeType: INLINES.HYPERLINK,
          data: { uri: "https://usadeafvolleyball.com/about/" },
          content: [
            {
              nodeType: "text",
              value: "USA Deaf Volleyball",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "text",
          value: " – Beach Director.",
          marks: [],
          data: {},
        },
      ],
    },
  ],
};

export const STATIC_BLOG_POSTS_DETAIL: Record<string, StaticBlogPost> = {
  "a-collaborative-journey-with-prof-laurie-achin": {
    slug: "a-collaborative-journey-with-prof-laurie-achin",
    title: "A Collaborative Journey With Prof. Laurie Achin",
    excerpt: "The Deaf Music Enthusiast that started it all",
    publicationDate: "2023-06-22",
    authorName: "Tactus Team",
    featuredImageUrl: "/_next/static/media/Laurie.png",
    featuredImageAlt: "Prof. Laurie Achin",
    body: laurieAchinBody,
  },
};

export function getStaticBlogPost(slug: string): StaticBlogPost | null {
  return STATIC_BLOG_POSTS_DETAIL[slug] || null;
}

