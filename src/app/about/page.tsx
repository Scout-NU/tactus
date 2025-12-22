import { getAboutPageData } from "./aboutData";
import AboutPageClient from "./AboutPageClient";

export const revalidate = 300;

export default async function AboutPage() {
  const data = await getAboutPageData();
  return <AboutPageClient data={data} />;
}
