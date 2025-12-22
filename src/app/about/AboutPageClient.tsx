"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { BackgroundWave } from "../components/shop/BackgroundWave";
import HubSpotPopup from "../components/HubSpotPopup/HubSpotPopup";
import type { AboutPageData, Principle } from "./aboutData";

import waveTop from "@/app/_assets/shop/waves/wave-top.svg";
import waveInContact from "@/app/_assets/shared/waves/wave-in-contact.svg";
import recordImage from "@/app/_assets/shared/brand/record.png";

type AboutPageClientProps = {
  data: AboutPageData;
};

export default function AboutPageClient({ data }: AboutPageClientProps) {
  const [isHubSpotPopupOpen, setIsHubSpotPopupOpen] = useState(false);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-white"
      style={{
        background:
          "radial-gradient(ellipse 1145px 1606.4px at 605.5px 315.5px, rgba(5,54,95,1) 19.712%, rgba(4,28,57,1) 59.856%, rgba(4,15,38,1) 79.928%, rgba(3,2,19,1) 100%)",
      }}
    >
      <BackgroundWave
        src={waveTop}
        className="-top-1 left-[40%] h-[900px] w-[2100px] -translate-x-[40%] md:-translate-x-1/3"
        priority
      />

      <div className="relative z-[1] pt-[80px] md:pt-[100px]">
        <MissionSection data={data} />
        <PhotoGridSection data={data} />
        <CorePrinciplesSection data={data} />
        <TeamSection data={data} />
        <SponsorsSection data={data} />
        <DontMissABeatSection
          data={data}
          onOpenPopup={() => setIsHubSpotPopupOpen(true)}
        />
      </div>

      <HubSpotPopup
        isOpen={isHubSpotPopupOpen}
        onClose={() => setIsHubSpotPopupOpen(false)}
      />
    </div>
  );
}

function MissionSection({ data }: { data: AboutPageData }) {
  return (
    <section className="relative mx-auto flex flex-col items-start px-5 pb-[225px] pt-[120px] text-left md:top-[55px] md:h-[56.5625rem] md:w-full md:max-w-[90rem] md:px-[110px] md:pb-[350px] md:pt-[140px]">
      <h2 className="mb-3 font-heading text-[28px] font-semibold text-[#FA7A57] md:mb-4 md:text-[40px]">
        {data.mission.label}
      </h2>
      <h1 className="max-w-[1194px] font-heading text-[40px] font-bold uppercase leading-[100%] text-white md:text-[64px]">
        {data.mission.heading}
      </h1>
    </section>
  );
}

function PhotoGridSection({ data }: { data: AboutPageData }) {
  return (
    <div className="relative right-[20px] top-[50px] z-30 -mb-[50px] -mt-[250px] px-5 md:-mb-[30px] md:-mt-[300px] md:px-0">
      <div className="hidden md:block">
        <div className="relative mx-auto h-[400px] max-w-[1440px] px-[110px]">
          {data.missionPhotos.map((photo, index) => (
            <div
              key={index}
              className="absolute overflow-hidden rounded-md border-4 border-[#97eff1]"
              style={{
                left:
                  index === 0
                    ? "0px"
                    : index === 1
                      ? "270px"
                      : index === 2
                        ? "655px"
                        : "1023px",
                top:
                  index === 0 || index === 3
                    ? "100px"
                    : index === 1
                      ? "146px"
                      : "75px",
                width:
                  index === 0
                    ? "315px"
                    : index === 1
                      ? "396px"
                      : index === 2
                        ? "414px"
                        : "411px",
                height:
                  index === 0
                    ? "236px"
                    : index === 1
                      ? "297px"
                      : index === 2
                        ? "285px"
                        : "291px",
                zIndex: photo.zIndex,
              }}
            >
              <Image
                src={photo.src}
                alt={`Mission photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="450px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto h-[200px] max-w-[400px] md:hidden">
        {data.missionPhotos.map((photo, index) => (
          <div
            key={index}
            className="absolute overflow-hidden rounded-md border-2 border-[#97eff1]"
            style={{
              left:
                index === 0
                  ? "0px"
                  : index === 1
                    ? "80px"
                    : index === 2
                      ? "190px"
                      : "290px",
              top:
                index === 0 || index === 3
                  ? "50px"
                  : index === 1
                    ? "70px"
                    : "35px",
              width:
                index === 0
                  ? "110px"
                  : index === 1
                    ? "138px"
                    : index === 2
                      ? "144px"
                      : "143px",
              height:
                index === 0
                  ? "82px"
                  : index === 1
                    ? "104px"
                    : index === 2
                      ? "99px"
                      : "101px",
              zIndex: photo.zIndex,
            }}
          >
            <Image
              src={photo.src}
              alt={`Mission photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="150px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CorePrinciplesSection({ data }: { data: AboutPageData }) {
  return (
    <section className="relative bg-white px-5 py-[80px] pt-[180px] md:px-[110px] md:py-[120px] md:pt-[220px]">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-8">
        <h2 className="relative z-10 mb-[150px] p-[-10px] font-heading font-bold uppercase text-[#05365f] md:mb-[180px] text-[36px] md:text-[64px]">
          {data.principles.heading}
        </h2>
      </div>
      <div className="relative z-10 mx-auto hidden max-w-[1200px] items-center justify-center gap-12 md:flex lg:gap-16">
        {data.principles.items.map((principle, index) => (
          <PrincipleCard key={index} {...principle} />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center gap-[150px] md:hidden">
        {data.principles.items.map((principle, index) => (
          <PrincipleCard key={index} {...principle} isMobile={true} />
        ))}
      </div>
    </section>
  );
}

function PrincipleCard({
  title,
  vinylCover,
  isMobile = false,
}: Principle & { isMobile?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 overflow-visible"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{
        width: isMobile ? "18rem" : "22.625rem",
        height: isMobile ? "18rem" : "22.625rem",
      }}
    >
      <div
        className="absolute inset-0 overflow-visible rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 45.3%, #05365F 0%, #042947 25%, #031B30 50%, #010E18 75%, #01070C 87.5%, #000000 100%)",
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-out"
          style={{
            width: "100%",
            height: "100%",
            top: isMobile ? "-40%" : isHovered ? "-40%" : "0%",
            zIndex: 0,
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src={recordImage}
              alt="Vinyl record"
              fill
              className="object-contain"
              sizes={isMobile ? "224px" : "362px"}
            />
          </div>
        </div>

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{
            width: isMobile ? "18rem" : "22.625rem",
            height: isMobile ? "18rem" : "22.625rem",
            zIndex: 10,
          }}
        >
          <Image
            src={vinylCover}
            alt={title}
            fill
            className="object-cover"
            sizes={isMobile ? "224px" : "362px"}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(69.2% 69.2% at 50% 45.3%, #05365F 0%, #000 100%)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
          <h3
            className="font-heading text-[32px] font-semibold leading-tight text-white md:text-[40px]"
            style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

function TeamSection({ data }: { data: AboutPageData }) {
  return (
    <section className="relative bg-white px-5 pb-[80px] md:px-[110px] md:pb-[120px]">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-8">
        <h2 className="align-left mb-8 font-heading font-bold uppercase text-[#05365f] md:mb-12 text-[36px] md:text-[64px]">
          {data.team.heading}
        </h2>
        <div className="grid grid-cols-3 justify-items-center gap-1 md:flex md:flex-wrap md:justify-center md:gap-[15px]">
          {data.team.members.map((member, index) => (
            <div
              key={index}
              className="flex w-[6.8325rem] flex-col gap-2 rounded-md bg-[#05365f] p-0 shadow-lg md:w-[11.42056rem] md:gap-4"
              style={{ flexShrink: 0 }}
            >
              <div className="relative h-[6rem] w-full overflow-hidden rounded-t-md md:h-[9.5rem]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 109px, 182px"
                />
              </div>
              <div className="flex h-[4.5rem] flex-col items-center justify-center px-1 py-1 pb-2 md:h-[8rem] md:gap-2 md:p-3 md:pb-4">
                <h3 className="text-center font-heading text-[0.78663rem] font-normal leading-normal text-white md:text-[18px] lg:text-[21px]">
                  {member.name}
                </h3>
                <p className="pb-[2px] text-center font-heading text-[0.65rem] font-normal leading-normal text-white md:text-[12px] lg:text-[14px]">
                  {member.role}
                </p>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 h-[12px] w-[12px] cursor-pointer transition-opacity hover:opacity-80 md:mt-1 md:h-[21px] md:w-[21px]"
                >
                  <svg
                    className="h-full w-full"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 0H1.5C0.671573 0 0 0.671573 0 1.5V19.5C0 20.3284 0.671573 21 1.5 21H19.5C20.3284 21 21 20.3284 21 19.5V1.5C21 0.671573 20.3284 0 19.5 0Z"
                      fill="white"
                    />
                    <path
                      d="M3.15 7.875H6.3V17.85H3.15V7.875ZM4.725 3.15C5.76975 3.15 6.615 3.99525 6.615 5.04C6.615 6.08475 5.76975 6.93 4.725 6.93C3.68025 6.93 2.835 6.08475 2.835 5.04C2.835 3.99525 3.68025 3.15 4.725 3.15Z"
                      fill="#05365f"
                    />
                    <path
                      d="M9.45 7.875H12.39V9.24H12.4305C12.8355 8.4735 13.9185 7.665 15.5025 7.665C18.6105 7.665 19.215 9.72 19.215 12.39V17.85H16.065V13.104C16.065 11.9175 16.0455 10.3755 14.406 10.3755C12.7455 10.3755 12.4875 11.697 12.4875 13.0185V17.85H9.3375V7.875H9.45Z"
                      fill="#05365f"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorsSection({ data }: { data: AboutPageData }) {
  return (
    <section className="relative bg-white px-5 pb-[80px] md:px-[110px] md:pb-[120px]">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-5">
        <h2 className="mb-12 font-heading font-bold uppercase text-[#05365f] md:mb-16 text-[36px] md:text-[64px]">
          {data.sponsors.heading}
        </h2>
      </div>
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-center gap-8 md:gap-x-12 md:gap-y-16">
        {data.sponsors.items.map((sponsor, index) => {
          const Content = (
            <div className="relative mx-auto h-[80px] w-full max-w-[200px] md:h-[100px]">
              <Image
                src={sponsor.src}
                alt={sponsor.alt}
                fill
                className="object-contain"
              />
            </div>
          );

          const itemClassName = "w-[calc(50%-1rem)] md:w-[calc(25%-2.25rem)]";

          return sponsor.href ? (
            <a
              key={index}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`block transition-opacity hover:opacity-80 ${itemClassName}`}
            >
              {Content}
            </a>
          ) : (
            <div key={index} className={itemClassName}>
              {Content}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DontMissABeatSection({
  data,
  onOpenPopup,
}: {
  data: AboutPageData;
  onOpenPopup: () => void;
}) {
  return (
    <section className="relative overflow-hidden bg-white py-[80px] md:h-[55vh] md:py-0">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image src={waveInContact} alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 flex h-full items-center justify-start px-5 md:px-[124px]">
        <div className="flex max-w-[657px] flex-col gap-[18px]">
          <h2 className="font-heading font-bold uppercase leading-[100%] text-[#05365f] text-[36px] md:text-[64px]">
            {data.contact.heading}
          </h2>
          <p className="font-body text-[16px] leading-normal text-[#05365f] md:text-[20px]">
            {data.contact.description}
          </p>
          <button
            onClick={onOpenPopup}
            className="relative z-10 mt-2 flex h-[58px] w-[310px] items-center justify-center rounded-[5px] bg-[#05365f] font-heading text-[20px] text-white transition-opacity hover:opacity-90 md:text-[22px]"
          >
            {data.contact.ctaText}
          </button>
        </div>

        <div className="absolute right-[-150px] top-[100%] hidden h-[750px] w-[750px] -translate-y-1/2 md:block">
          <Image
            src={recordImage}
            alt="Vinyl record"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

