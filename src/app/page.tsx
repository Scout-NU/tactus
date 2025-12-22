import { getHomepageData } from "./homeData";
import HomePageClient from "./HomePageClient";

// Enable ISR - revalidate every 5 minutes
export const revalidate = 3600; // 1 hour - webhooks handle immediate updates

export default async function Home() {
  const data = await getHomepageData();
  return <HomePageClient data={data} />;
}
