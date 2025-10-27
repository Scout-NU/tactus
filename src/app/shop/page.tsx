"use client";

import CustomHeader from "../components/CustomHeader/CustomHeader";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import SizeSelector from "./components/SizeSelector";
import KeyFeaturesSection from "./components/KeyFeaturesSection";
import ProductTabs from "./components/ProductTabs";
import BottomFeatures from "./components/BottomFeatures";
import StickyCartBar from "./components/StickyCartBar";

export default function ShopPage() {
  // Sample product data - will be replaced with real data later
  const product = {
    name: "Product Name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    price: 0.0,
    rating: 5.0,
    reviewCount: 100,
    mainImage: "/placeholder-product.svg",
    thumbnails: [
      "/placeholder-product.svg",
      "/placeholder-product.svg",
      "/placeholder-product.svg",
      "/placeholder-product.svg",
    ],
    sizes: ["S", "M", "L"],
    keyFeatures: ["feature 1", "feature 1", "feature 1"],
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    specifications: {
      Material: "Premium Quality",
      Weight: "TBD",
      Dimensions: "TBD",
      Color: "As shown",
    },
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log("Added to cart");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <CustomHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Left Column - Product Gallery */}
          <div className="w-full max-w-[479px]">
            <ProductGallery
              mainImage={product.mainImage}
              thumbnails={product.thumbnails}
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col gap-8">
            <ProductInfo
              name={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />

            <SizeSelector sizes={product.sizes} />

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3.5 rounded-lg text-lg font-normal transition-colors"
            >
              Add to Cart
            </button>

            <KeyFeaturesSection features={product.keyFeatures} />
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <ProductTabs
            description={product.longDescription}
            specifications={product.specifications}
          />
        </div>

        {/* Bottom Features */}
        <BottomFeatures
          features={[
            { icon: "smile", title: "Key Feature" },
            { icon: "activity", title: "Key Feature" },
            { icon: "heart", title: "Key Feature" },
          ]}
        />
      </main>

      {/* Sticky Cart Bar - appears when scrolling down */}
      {/* <StickyCartBar
        productName={product.name}
        productImage={product.mainImage}
        price={product.price}
        description={product.description}
      /> */}

      {/* Footer Placeholder */}
      <footer className="bg-gray-400 h-72 mt-16"></footer>
    </div>
  );
}
