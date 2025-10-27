"use client";

import { useState } from "react";

interface ProductTabsProps {
  description: string;
  specifications?: Record<string, string>;
}

type TabType = "description" | "specifications" | "reviews" | "customize";

export default function ProductTabs({
  description,
  specifications = {},
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const tabs = [
    { id: "description" as TabType, label: "Description" },
    { id: "specifications" as TabType, label: "Specifications" },
    { id: "reviews" as TabType, label: "Reviews" },
    { id: "customize" as TabType, label: "Make It Yours (coming soon)" },
  ];

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="bg-gray-200 rounded-lg p-1.5 flex gap-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-12 py-2 rounded-lg text-base font-normal transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-black"
                : "bg-neutral-200 text-black hover:bg-neutral-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === "description" && (
          <div>
            <h3 className="text-lg font-medium text-black mb-4">
              About the product
            </h3>
            <p className="text-sm font-light leading-relaxed text-black">
              {description}
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div>
            <h3 className="text-lg font-medium text-black mb-4">
              Specifications
            </h3>
            <div className="space-y-2">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex gap-4">
                  <span className="font-medium text-black">{key}:</span>
                  <span className="font-light text-black">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h3 className="text-lg font-medium text-black mb-4">
              Customer Reviews
            </h3>
            <p className="text-sm font-light text-black">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        )}

        {activeTab === "customize" && (
          <div>
            <h3 className="text-lg font-medium text-black mb-4">
              Make It Yours
            </h3>
            <p className="text-sm font-light text-black">
              Customization options coming soon! Stay tuned for the ability to
              personalize your product.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

