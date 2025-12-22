import { getVestPageData } from "./vestData";
import VestPageClient from "./VestPageClient";

export const revalidate = 3600; // 1 hour - webhooks handle immediate updates

export default async function VestProductPage() {
  const data = await getVestPageData();
  return <VestPageClient data={data} />;
}
