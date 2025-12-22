import { getJacketPageData } from "./jacketData";
import JacketPageClient from "./JacketPageClient";

export const revalidate = 300;

export default async function JacketProductPage() {
  const data = await getJacketPageData();
  return <JacketPageClient data={data} />;
}
