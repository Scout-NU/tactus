import { getShopPageData } from "./shopData";
import ShopPageClient from "./ShopPageClient";

export const revalidate = 3600; // 1 hour - webhooks handle immediate updates

export default async function ShopPage() {
  const data = await getShopPageData();
  return <ShopPageClient data={data} />;
}
