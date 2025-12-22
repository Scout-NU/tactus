import { getCommunityPageData } from "./communityData";
import CommunityPageClient from "./CommunityPageClient";

export const revalidate = 300;

export default async function CommunityPage() {
  const data = await getCommunityPageData();
  return <CommunityPageClient data={data} />;
}
