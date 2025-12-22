import { getCommunityPageData } from "./communityData";
import CommunityPageClient from "./CommunityPageClient";

export const revalidate = 3600; // 1 hour - webhooks handle immediate updates

export default async function CommunityPage() {
  const data = await getCommunityPageData();
  return <CommunityPageClient data={data} />;
}
