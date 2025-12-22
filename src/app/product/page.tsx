import { getProductPageData } from "./productData";
import ProductPageClient from "./ProductPageClient";

export const revalidate = 300;

export default async function ProductPage() {
  const data = await getProductPageData();
  return <ProductPageClient data={data} />;
}
