import { getProductPageData } from "./productData";
import ProductPageClient from "./ProductPageClient";

export const revalidate = 3600; // 1 hour - webhooks handle immediate updates

export default async function ProductPage() {
  const data = await getProductPageData();
  return <ProductPageClient data={data} />;
}
