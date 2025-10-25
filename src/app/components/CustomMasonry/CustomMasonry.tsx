import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import "./CustomMasonryStyle.css";

export default function CustomMasonry() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          header={item.header}
          className={`
  ${i === 1 ? "md:col-span-2" : ""}
  ${i === 3 ? "md:row-span-2" : ""}
`}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    header: <Skeleton />,
  },
  {
    header: <Skeleton />,
  },
  {
    header: <Skeleton />,
  },
  {
    header: <Skeleton />,
  },
  {
    header: <Skeleton />,
  },
  {
    header: <Skeleton />,
  },
  {
    header: <Skeleton />,
  },
];
