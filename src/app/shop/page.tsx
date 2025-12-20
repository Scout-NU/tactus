import { BackgroundWave } from "@/app/components/shop/BackgroundWave";
import { ProductSection } from "@/app/components/shop/ProductSection";

import { SHOP_PRODUCTS, SHOP_SIZES } from "./shopData";

// Wave assets
import waveTop from "@/app/_assets/shop/waves/wave-top.svg";
import waveBottom from "@/app/_assets/shop/waves/wave-bottom.svg";

export default function ShopPage() {
  return (
    <main
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 1145px 1606.4px at 605.5px 720.26px, rgba(5,54,95,1) 19.712%, rgba(4,28,57,1) 59.856%, rgba(4,15,38,1) 79.928%, rgba(3,2,19,1) 100%)",
        paddingTop: "50px",
        paddingBottom: "100px",
      }}
    >
      <div className="pointer-events-none" aria-hidden>
        <BackgroundWave
          src={waveTop}
          className="-top-1 left-[40%] h-[900px] w-[2100px] -translate-x-[40%] md:-translate-x-1/3"
          priority
        />
        <BackgroundWave
          src={waveBottom}
          className="top-[65%] right-[-10%] h-[900px] w-[2100px] scale-y-[1]"
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-20 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <header className="space-y-6">
          <h1 className="font-heading max-w-3xl text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-[4rem] lg:leading-[1.05]">
            Explore Our Products
          </h1>
        </header>

        {SHOP_PRODUCTS.map((product) => (
          <ProductSection
            key={product.id}
            productId={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            originalPrice={product.originalPrice}
            priceInCents={product.priceInCents}
            stripePriceIds={product.stripePriceIds}
            galleryVariant={product.galleryVariant}
            sizes={product.sizes ?? SHOP_SIZES}
            galleryImages={product.galleryImages}
          />
        ))}
      </div>
    </main>
  );
}
