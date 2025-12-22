import { getHomepageData } from "./homeData";
import HomePageClient from "./HomePageClient";

// Enable ISR - revalidate every 5 minutes
export const revalidate = 300;

export default async function Home() {
  const data = await getHomepageData();
  return <HomePageClient data={data} />;
}
