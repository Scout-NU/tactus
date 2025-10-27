import { Smile, Activity, Heart } from "lucide-react";

interface BottomFeaturesProps {
  features?: Array<{ icon: string; title: string }>;
}

export default function BottomFeatures({
  features = [
    { icon: "smile", title: "Key Feature" },
    { icon: "activity", title: "Key Feature" },
    { icon: "heart", title: "Key Feature" },
  ],
}: BottomFeaturesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "smile":
        return <Smile className="w-11 h-11" />;
      case "activity":
        return <Activity className="w-11 h-11" />;
      case "heart":
        return <Heart className="w-11 h-11" />;
      default:
        return <Smile className="w-11 h-11" />;
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg py-12 px-8">
      <div className="flex justify-center items-center gap-48">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 min-w-[109px]"
          >
            <div className="text-black">{getIcon(feature.icon)}</div>
            <p className="text-base font-medium text-black text-center whitespace-nowrap">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

