import Image from "next/image";

import { cn } from "@/lib/utils";

type BackgroundWaveProps = {
  src: string;
  className?: string;
  priority?: boolean;
};

export function BackgroundWave({ src, className, priority }: BackgroundWaveProps) {
  return (
    <div className={cn("absolute", className)}>
      <Image src={src} alt="" fill priority={priority} className="object-cover" />
    </div>
  );
}

