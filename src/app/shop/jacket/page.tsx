import { getJacketPageData } from "./jacketData";
import JacketPageClient from "./JacketPageClient";

export const revalidate = 3600; // 1 hour - webhooks handle immediate updates

export default async function JacketProductPage() {
  const data = await getJacketPageData();
  return <JacketPageClient data={data} />;
}
