interface KeyFeature {
  icon: string;
  title: string;
}

interface KeyFeaturesSectionProps {
  features: string[];
}

export default function KeyFeaturesSection({
  features,
}: KeyFeaturesSectionProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h3 className="text-lg font-medium text-black">Key Features</h3>
      <div className="flex flex-col gap-2 text-sm font-light text-black">
        {features.map((feature, index) => (
          <p key={index}>→ {feature}</p>
        ))}
      </div>
    </div>
  );
}

