import { BackgroundWave } from "@/app/components/shop/BackgroundWave";
import { ProductSection } from "@/app/components/shop/ProductSection";

import { SHOP_PRODUCTS, SHOP_SIZES } from "./shopData";

export default function ShopPage() {
  return (
    <main className="relative overflow-hidden bg-white">
      <div className="pointer-events-none" aria-hidden>
        <BackgroundWave
          src="/assets/shop/wave-left.svg"
          className="-top-20 left-1/2 h-[900px] w-[2100px] -translate-x-[40%] md:-translate-x-1/3"
          priority
        />
        <BackgroundWave
          src="/assets/shop/wave-right.svg"
          className="bottom-[-35%] right-[-10%] h-[900px] w-[2100px] scale-y-[-1]"
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-20 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <header className="space-y-6">
          <h1 className="font-heading max-w-3xl text-4xl font-bold uppercase tracking-tight text-[#101828] sm:text-5xl lg:text-[4rem] lg:leading-[1.05]">
            Explore Our Products
          </h1>
        </header>

        {SHOP_PRODUCTS.map((product) => (
          <ProductSection
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            galleryVariant={product.galleryVariant}
            sizes={product.sizes ?? SHOP_SIZES}
            galleryImages={product.galleryImages}
          />
        ))}
      </div>

      <footer className="relative h-60 w-full bg-[#05365f]" aria-hidden />
    </main>
  );
}

