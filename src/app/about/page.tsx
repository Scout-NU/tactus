"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { BackgroundWave } from "../components/shop/BackgroundWave";
import HubSpotPopup from "../components/HubSpotPopup/HubSpotPopup";

// Shared assets
import waveTop from "@/app/_assets/shop/waves/wave-top.svg";
import waveInContact from "@/app/_assets/shared/waves/wave-in-contact.svg";
import recordImage from "@/app/_assets/shared/brand/record.png";

// Mission photos
import mission1 from "@/app/_assets/about/mission/our-mission-1.png";
import mission2 from "@/app/_assets/about/mission/our-mission-2.png";
import mission3 from "@/app/_assets/about/mission/our-mission-3.png";
import mission4 from "@/app/_assets/about/mission/our-mision-4.png";

// Vinyl covers
import vinylCover1 from "@/app/_assets/about/vinyl/vinyl-cover-1.jpg";
import vinylCover2 from "@/app/_assets/about/vinyl/vinyl-cover-2.jpg";
import vinylCover3 from "@/app/_assets/about/vinyl/vinyl-cover-3.jpg";

// Team photos
import jeremyTeam from "@/app/_assets/about/team/jeremy-team.png";
import johanTeam from "@/app/_assets/about/team/johan-team.png";
import alexTeam from "@/app/_assets/about/team/alex-team.png";
import cayleTeam from "@/app/_assets/about/team/cayle-team.png";
import antoinetteTeam from "@/app/_assets/about/team/antoinette-team.png";
import nicholasTeam from "@/app/_assets/about/team/nicholas-team.png";

// Sponsor images
import sponsor1 from "@/app/_assets/shared/sponsor-images/sponsor-1.png";
import sponsor2 from "@/app/_assets/shared/sponsor-images/sponsor-2.png";
import sponsor3 from "@/app/_assets/shared/sponsor-images/sponsor-3.png";
import sponsor4 from "@/app/_assets/shared/sponsor-images/sponsor-4.png";
import sponsor5 from "@/app/_assets/shared/sponsor-images/sponsor-5.png";
import sponsor6 from "@/app/_assets/shared/sponsor-images/sponsor-6.png";
import sponsor7 from "@/app/_assets/shared/sponsor-images/sponsor-7.png";
import sponsor8 from "@/app/_assets/shared/sponsor-images/sponsor-8.png";
import sponsor9 from "@/app/_assets/shared/sponsor-images/sponsor-9.png";
import sponsor10 from "@/app/_assets/shared/sponsor-images/sponsor-10.png";
import sponsor11 from "@/app/_assets/shared/sponsor-images/sponsor-11.png";
import sponsor12 from "@/app/_assets/shared/sponsor-images/sponsor-12.png";
import sponsor13 from "@/app/_assets/shared/sponsor-images/sponsor-13.png";
import sponsor14 from "@/app/_assets/shared/sponsor-images/sponsor-14.png";

export default function AboutPage() {
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
        {/* Mission Section */}
        <MissionSection />

        {/* Photo Grid - Overlapping both mission end and core principles start */}
        <PhotoGridSection />

        {/* Core Principles Section with Vinyl Records */}
        <CorePrinciplesSection />

        {/* Team Section */}
        <TeamSection />

        {/* Supporters Section */}
        <SponsorsSection />

        {/* Don't Miss a Beat Section */}
        <DontMissABeatSection onOpenPopup={() => setIsHubSpotPopupOpen(true)} />
      </div>

      {/* HubSpot Form Popup */}
      <HubSpotPopup
        isOpen={isHubSpotPopupOpen}
        onClose={() => setIsHubSpotPopupOpen(false)}
      />
    </div>
  );
}

// Mission Hero Section
function MissionSection() {
  return (
    <section className="relative flex  flex-col items-start px-5 pb-[225px] pt-[120px] text-left md:h-[56.5625rem] md:w-full md:max-w-[90rem] md:px-[110px] md:pb-[350px] md:pt-[140px] mx-auto md:top-[55px]">
      <h2 className="mb-3 font-heading text-[28px] font-semibold text-[#FA7A57] md:mb-4 md:text-[40px]">
        Our Mission
      </h2>
      <h1 className="max-w-[1194px] font-heading text-[40px] font-bold uppercase leading-[100%] text-white md:text-[64px]">
        TO PROVIDE A NEW WAY FOR DEAF AND HARD OF HEARING INDIVIDUALS TO ENJOY
        MUSIC AND CONNECT WITH ONE ANOTHER.
      </h1>
    </section>
  );
}

// Photo Grid Section (positioned to overlap mission end and core principles start)
function PhotoGridSection() {
  const missionPhotos = [
    { src: mission1, zIndex: 40 },
    { src: mission2, zIndex: 39 },
    { src: mission3, zIndex: 38 },
    { src: mission4, zIndex: 37 },
  ];

  return (
    <div className="relative top-[50px] right-[20px] z-30 -mt-[250px] mb-[-50px] px-5 md:-mt-[300px] md:-mb-[30px] md:px-0">
      {/* Desktop: Staggered Layout */}
      <div className="hidden md:block">
        <div className="relative mx-auto h-[400px] max-w-[1440px] px-[110px]">
          {missionPhotos.map((photo, index) => (
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

      {/* Mobile: Overlapping Layout (scaled down from desktop) */}
      <div className="relative mx-auto h-[200px] max-w-[400px] md:hidden">
        {missionPhotos.map((photo, index) => (
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

// Core Principles Section with Vinyl Records
function CorePrinciplesSection() {
  const principles = [
    {
      title: "Embrace Music",
      vinylCover: vinylCover1,
    },
    {
      title: "Empower Connection",
      vinylCover: vinylCover2,
    },
    {
      title: "Celebrate Inclusion",
      vinylCover: vinylCover3,
    },
  ];

  return (
    <section className="relative bg-white px-5 py-[80px] pt-[180px] md:px-[110px] md:py-[120px] md:pt-[220px]">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-8">

      <h2 className="relative z-10 mb-[150px] font-heading p-[-10px] font-bold uppercase text-[#05365f] md:mb-[180px] text-[36px] md:text-[64px]">
        THE CORE PRINCIPLES
      </h2>
      </div>
      {/* Desktop: 3 Column Layout */}
      <div className="relative z-10 mx-auto hidden max-w-[1200px] items-center justify-center gap-12 md:flex lg:gap-16">
        {principles.map((principle, index) => (
          <PrincipleCard key={index} {...principle} />
        ))}
      </div>

      {/* Mobile: Vinyls stacked vertically with records always visible */}
      <div className="relative z-10 flex flex-col items-center gap-[150px] md:hidden">
        {principles.map((principle, index) => (
          <PrincipleCard key={index} {...principle} isMobile={true} />
        ))}
      </div>
     
    </section>
  );
}

// Principle Card with Vinyl Hover Animation
function PrincipleCard({
  title,
  vinylCover,
  isMobile = false,
}: {
  title: string;
  vinylCover: string | StaticImageData;
  isMobile?: boolean;
}) {
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
      {/* Background circular gradient container */}
      <div
        className="absolute inset-0 overflow-visible rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 45.3%, #05365F 0%, #042947 25%, #031B30 50%, #010E18 75%, #01070C 87.5%, #000000 100%)",
        }}
      >
        {/* Vinyl Record - positioned at top, slides up on hover (static on mobile) */}
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

        {/* Vinyl cover image - SQUARE with higher z-index to overlay record */}
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

        {/* Title overlay at bottom */}
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

// Team Section
function TeamSection() {
  const teamMembers = [
    {
      name: "Jeremy Chow",
      role: "Founder",
      image: jeremyTeam,
      linkedinUrl: "https://www.linkedin.com/in/jeremy-py-chow/",
    },
    {
      name: "Johan Darboven",
      role: "Strategy Director",
      image: johanTeam,
      linkedinUrl:
        "https://www.linkedin.com/in/johann-arthur-darboven-a01275196/",
    },
    {
      name: "Alex Crist",
      role: "Lead Software Engineer",
      image: alexTeam,
      linkedinUrl: "https://www.linkedin.com/in/alex-crist/",
    },
    {
      name: "Cayle O'Brien",
      role: "Staff Interpreter",
      image: cayleTeam,
      linkedinUrl:
        "https://www.linkedin.com/in/cayle-o-brien-ms-nic-b69a68211/",
    },
    {
      name: "Antoinette Chow",
      role: "Designer",
      image: antoinetteTeam,
      linkedinUrl: "https://www.linkedin.com/in/antoinette-chow/",
    },
    {
      name: "Nicholas Chow",
      role: "Product Engineer",
      image: nicholasTeam,
      linkedinUrl: "https://www.linkedin.com/in/nptchow/",
    },
  ];

  return (
    <section className="relative bg-white px-5 pb-[80px] md:px-[110px] md:pb-[120px]">
     
      <div className="mx-auto flex max-w-[76rem] flex-col gap-8">
      <h2 className="mb-8 font-heading font-bold uppercase text-[#05365f] align-left md:mb-12 text-[36px] md:text-[64px]">
        MEET THE TEAM
      </h2>
        <div className="grid grid-cols-3 justify-items-center gap-1 md:flex md:flex-wrap md:justify-center md:gap-[15px]">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex w-[6.8325rem] flex-col gap-2 rounded-md bg-[#05365f] p-0 shadow-lg md:w-[11.42056rem] md:gap-4"
              style={{
                flexShrink: 0,
              }}
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
              <div className="flex h-[4.5rem] flex-col items-center justify-center  px-1 py-1 pb-2 md:h-[8rem] md:gap-2 md:p-3 md:pb-4">
                <h3 className="text-center font-heading text-[0.78663rem] font-normal leading-normal text-white md:text-[18px] lg:text-[21px]">
                  {member.name}
                </h3>
                <p className="text-center font-heading text-[0.65rem] font-normal leading-normal pb-[2px] text-white md:text-[12px] lg:text-[14px]">
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

// Sponsors Section
function SponsorsSection() {
  const sponsors: { src: StaticImageData; alt: string; href?: string }[] = [
    { src: sponsor1, alt: "Sponsor 1" },
    { src: sponsor2, alt: "Sponsor 2" },
    { src: sponsor3, alt: "Sponsor 3" },
    {
      src: sponsor4,
      alt: "Sponsor 4",
      href: "https://www.bizjournals.com/boston/inno/stories/profiles/2020/09/22/exclusive-tactus-deaf-startup-smart-clothing-music.html",
    },
    { src: sponsor5, alt: "Sponsor 5" },
    { src: sponsor6, alt: "Sponsor 6" },
    { src: sponsor11, alt: "Sponsor 11" },
    { src: sponsor7, alt: "Sponsor 7" },
    { src: sponsor8, alt: "Sponsor 8" },
    {
      src: sponsor9,
      alt: "Sponsor 9",
      href: "https://cic.com/blog/bringing-music-to-life-through-touch-a-conversation-with-tactus-founder-jeremy-chow/",
    },
    {
      src: sponsor10,
      alt: "Sponsor 10",
      href: "https://drive.google.com/file/d/1V4Z2YlX6ZHufJGKbVSVu6fP_SNiRcR-O/view?usp=sharing",
    },
    {
      src: sponsor12,
      alt: "Sponsor 12",
      href: "https://dttproductions.com/2025/11/10/tactus-music/",
    },
    { src: sponsor13, alt: "Sponsor 13" },
    {
      src: sponsor14,
      alt: "Sponsor 14",
      href: "https://fashionunited.com/news/fashion/how-tactus-makes-music-more-accessible-to-the-deaf-community-with-a-vibrating-shirt/2023031452805",
    },
  ];

  return (
    <section className="relative bg-white px-5 pb-[80px] md:px-[110px] md:pb-[120px]">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-5">
        <h2 className="mb-12 font-heading font-bold uppercase text-[#05365f] md:mb-16 text-[36px] md:text-[64px]">
          OUR SUPPORTERS
        </h2>
      </div>
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-center gap-8 md:gap-x-12 md:gap-y-16">
        {sponsors.map((sponsor, index) => {
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

// Don't Miss a Beat Section
function DontMissABeatSection({ onOpenPopup }: { onOpenPopup: () => void }) {
  return (
    <section className="relative overflow-hidden bg-white py-[80px] md:py-0 md:h-[55vh]">
      {/* Wave pattern background */}
      <div className="pointer-events-none absolute inset-0 z-0 ">
        <Image
          src={waveInContact}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-start px-5 md:px-[124px]">
        {/* Content */}
        <div className="flex max-w-[657px] flex-col gap-[18px]">
          <h2 className="font-heading font-bold uppercase leading-[100%] text-[#05365f] text-[36px] md:text-[64px]">
            DON&apos;T MISS A BEAT
          </h2>
          <p className="font-body text-[16px] leading-normal text-[#05365f] md:text-[20px]">
            Stay connected for early access to news from the Tactus team.
          </p>
          <button
            onClick={onOpenPopup}
            className="relative z-10 mt-2 flex h-[58px] w-[310px] items-center justify-center rounded-[5px] bg-[#05365f] font-heading text-[20px] text-white transition-opacity hover:opacity-90 md:text-[22px]"
          >
            STAY IN TOUCH
          </button>
        </div>

        {/* Record image - positioned on the right */}
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
