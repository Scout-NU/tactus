import { getAboutPageData } from "./aboutData";
import AboutPageClient from "./AboutPageClient";

export const revalidate = 3600; // 1 hour - webhooks handle immediate updates

export default async function AboutPage() {
  const data = await getAboutPageData();
  return <AboutPageClient data={data} />;
}
