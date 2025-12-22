import { getShopPageData } from "./shopData";
import ShopPageClient from "./ShopPageClient";

export const revalidate = 300;

export default async function ShopPage() {
  const data = await getShopPageData();
  return <ShopPageClient data={data} />;
}
