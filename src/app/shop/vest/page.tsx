import { getVestPageData } from "./vestData";
import VestPageClient from "./VestPageClient";

export const revalidate = 300;

export default async function VestProductPage() {
  const data = await getVestPageData();
  return <VestPageClient data={data} />;
}
