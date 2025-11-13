"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BackgroundWave } from "../components/shop/BackgroundWave";

export default function AboutPage() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-white"
      style={{
        background:
          "radial-gradient(ellipse 1145px 1606.4px at 605.5px 315.5px, rgba(5,54,95,1) 19.712%, rgba(4,28,57,1) 59.856%, rgba(4,15,38,1) 79.928%, rgba(3,2,19,1) 100%)",
      }}
    >
      <BackgroundWave
          src="/assets/shop/wave-top.svg"
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
        <DontMissABeatSection />
      </div>
    </div>
  );
}

// Mission Hero Section
function MissionSection() {
  return (
    <section className="relative flex top-[100px] flex-col items-start px-5 pb-[200px] pt-[120px] text-left md:h-[56.5625rem] md:w-full md:max-w-[90rem] md:px-[110px] md:pb-[350px] md:pt-[140px] mx-auto">
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
    { src: "/assets/about/our-mission-1.png", zIndex: 40 },
    { src: "/assets/about/our-mission-2.png", zIndex: 39 },
    { src: "/assets/about/our-mission-3.png", zIndex: 38 },
    { src: "/assets/about/our-mision-4.png", zIndex: 37 },
  ];

  return (
    <div className="relative top-[100px] z-30 -mt-[250px] mb-[-50px] px-5 md:-mt-[300px] md:mb-[0px] md:px-0">
      {/* Desktop: Staggered Layout */}
      <div className="hidden md:block">
        <div className="relative mx-auto h-[400px] max-w-[1440px] px-[110px]">
          {missionPhotos.map((photo, index) => (
            <div
              key={index}
              className="absolute overflow-hidden rounded-md border-4 border-[#97eff1]"
              style={{
                left: index === 0 ? "0px" : index === 1 ? "270px" : index === 2 ? "655px" : "1023px",
                top: index === 0 || index === 3 ? "100px" : index === 1 ? "146px" : "75px",
                width: index === 0 ? "315px" : index === 1 ? "396px" : index === 2 ? "414px" : "411px",
                height: index === 0 ? "236px" : index === 1 ? "297px" : index === 2 ? "285px" : "291px",
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

      {/* Mobile: Simple Grid */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {missionPhotos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-square w-full overflow-hidden rounded-md border-4 border-[#97eff1]"
          >
            <Image
              src={photo.src}
              alt={`Mission photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw"
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
      vinylCover: "/assets/about/vinyl-cover-1.jpg",
    },
    {
      title: "Empower Connection",
      vinylCover: "/assets/about/vinyl-cover-2.jpg",
    },
    {
      title: "Celebrate Inclusion",
      vinylCover: "/assets/about/vinyl-cover-3.jpg",
    },
  ];

  return (
    <section className="relative bg-white px-5 py-[80px] pt-[180px] md:px-[110px] md:py-[120px] md:pt-[220px]">

      <h2 className="relative z-10 mb-12 font-heading text-[48px] font-bold uppercase text-[#05365f] md:mb-[180px] md:text-[64px]">
        THE CORE PRINCIPLES
      </h2>

      {/* Desktop: 3 Column Layout */}
      <div className="relative z-10 mx-auto hidden max-w-[1200px] items-center justify-center gap-12 md:flex lg:gap-16">
        {principles.map((principle, index) => (
          <PrincipleCard key={index} {...principle} />
        ))}
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="relative z-10 flex gap-6 overflow-x-auto pb-4 md:hidden">
        {principles.map((principle, index) => (
          <div key={index} className="flex-shrink-0">
            <PrincipleCard {...principle} />
          </div>
        ))}
      </div>
    </section>
  );
}

// Principle Card with Vinyl Hover Animation
function PrincipleCard({
  title,
  vinylCover,
}: {
  title: string;
  vinylCover: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex-shrink-0 overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "22.625rem",
        height: "22.625rem",
      }}
    >
      {/* Background circular gradient container */}
      <div 
        className="absolute inset-0 overflow-visible rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 45.3%, #05365F 0%, #042947 25%, #031B30 50%, #010E18 75%, #01070C 87.5%, #000000 100%)",
        }}
      >
        {/* Vinyl Record - positioned at top, slides up on hover */}
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-out"
          style={{
            width: "100%",
            height: "100%",
            top: isHovered ? "-40%" : "0%",
            zIndex: 0,
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src="/assets/about/record.png"
              alt="Vinyl record"
              fill
              className="object-contain"
              sizes="362px"
            />
          </div>
        </div>

        {/* Vinyl cover image - SQUARE with higher z-index to overlay record */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{
            width: "22.625rem",
            height: "22.625rem",
            zIndex: 10,
          }}
        >
          <Image
            src={vinylCover}
            alt={title}
            fill
            className="object-cover"
            sizes="362px"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(69.2% 69.2% at 50% 45.3%, #05365F 0%, #000 100%)",
              mixBlendMode: "screen"
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
    { name: "Jeremy Chow", role: "Founder", image: "/assets/about/jeremy-team.png", linkedinUrl: "https://www.linkedin.com/in/jeremy-py-chow/" },
    { name: "Johan Darboven", role: "Strategy Director", image: "/assets/about/johan-team.png", linkedinUrl: "https://www.linkedin.com/in/johann-arthur-darboven-a01275196/" },
    { name: "Alex Crist", role: "Lead Software Engineer", image: "/assets/about/alex-team.png", linkedinUrl: "https://www.linkedin.com/in/alex-crist/" },
    { name: "Cayle O'Brien", role: "Staff Interpreter", image: "/assets/about/cayle-team.png", linkedinUrl: "https://www.linkedin.com/in/cayle-o-brien-ms-nic-b69a68211/" },
    { name: "Antoinette Chow", role: "Designer", image: "/assets/about/antoinette-team.png", linkedinUrl: "https://www.linkedin.com/in/antoinette-chow/" },
    { name: "Nicholas Chow", role: "Product Engineer", image: "/assets/about/nicholas-team.png", linkedinUrl: "https://www.linkedin.com/in/nptchow/" },
  ];

  return (
    <section className="relative bg-white px-5 pb-[80px] md:px-[110px] md:pb-[120px]">
      <h2 className="mb-8 font-heading text-[48px] font-bold uppercase text-[#05365f] md:mb-12 md:text-[60px]">
        MEET THE TEAM
      </h2>
      <div className="mx-auto flex max-w-[76rem] flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-[15px]">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-md bg-[#05365f] p-0 shadow-lg md:gap-4"
              style={{
                width: "11.42056rem",
                flexShrink: 0,
              }}
            >
              <div className="relative w-full overflow-hidden rounded-t-md" style={{ height: "9.5rem" }}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="182px"
                />
              </div>
              <div className="flex flex-col items-center gap-1 p-2 pb-3 md:gap-2 md:p-3 md:pb-4" style={{ height: "7.93906rem" }}>
                <h3 className="text-center font-heading text-[14px] font-normal leading-tight text-white md:text-[18px] lg:text-[21px]">
                  {member.name}
                </h3>
                <p className="text-center font-heading text-[10px] font-normal leading-tight text-white md:text-[12px] lg:text-[14px]">
                  {member.role}
                </p>
                <a 
                  href={member.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-1 h-[18px] w-[18px] cursor-pointer transition-opacity hover:opacity-80 md:h-[21px] md:w-[21px]"
                >
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 0H1.5C0.671573 0 0 0.671573 0 1.5V19.5C0 20.3284 0.671573 21 1.5 21H19.5C20.3284 21 21 20.3284 21 19.5V1.5C21 0.671573 20.3284 0 19.5 0Z" fill="white"/>
                    <path d="M3.15 7.875H6.3V17.85H3.15V7.875ZM4.725 3.15C5.76975 3.15 6.615 3.99525 6.615 5.04C6.615 6.08475 5.76975 6.93 4.725 6.93C3.68025 6.93 2.835 6.08475 2.835 5.04C2.835 3.99525 3.68025 3.15 4.725 3.15Z" fill="#05365f"/>
                    <path d="M9.45 7.875H12.39V9.24H12.4305C12.8355 8.4735 13.9185 7.665 15.5025 7.665C18.6105 7.665 19.215 9.72 19.215 12.39V17.85H16.065V13.104C16.065 11.9175 16.0455 10.3755 14.406 10.3755C12.7455 10.3755 12.4875 11.697 12.4875 13.0185V17.85H9.3375V7.875H9.45Z" fill="#05365f"/>
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
  return (
    <section className="relative bg-white px-5 pb-[80px] md:px-[110px] md:pb-[120px]">
      <h2 className="mb-12 font-heading text-[48px] font-bold uppercase text-[#05365f] md:mb-16 md:text-[64px]">
        OUR SUPPORTERS
      </h2>
      <div className="mx-auto flex max-w-[1172px] flex-col gap-16 md:gap-20">
        {/* Row 1 - 4 sponsors evenly spaced */}
        <div className="flex items-center justify-center gap-8 md:justify-between md:gap-12">
          <div className="relative h-[60px] w-[140px] flex-shrink-0 md:h-[76px] md:w-[190px]">
            <Image
              src="/assets/about/sponsor-1.png"
              alt="Sponsor 1"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[60px] w-[160px] flex-shrink-0 md:h-[76px] md:w-[224px]">
            <Image
              src="/assets/about/sponsor-2.png"
              alt="Sponsor 2"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[60px] w-[120px] flex-shrink-0 md:h-[76px] md:w-[168px]">
            <Image
              src="/assets/about/sponsor-3.png"
              alt="Sponsor 3"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[60px] w-[70px] flex-shrink-0 md:h-[76px] md:w-[92px]">
            <Image
              src="/assets/about/sponsor-4.png"
              alt="Sponsor 4"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Row 2 - 4 sponsors evenly spaced */}
        <div className="flex items-center justify-center gap-8 md:justify-between md:gap-12">
          <div className="relative h-[60px] w-[120px] flex-shrink-0 md:h-[76px] md:w-[167px]">
            <Image
              src="/assets/about/sponsor-5.png"
              alt="Sponsor 5"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[60px] w-[70px] flex-shrink-0 md:h-[76px] md:w-[96px]">
            <Image
              src="/assets/about/sponsor-6.png"
              alt="Sponsor 6"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[60px] w-[120px] flex-shrink-0 md:h-[76px] md:w-[160px]">
            <Image
              src="/assets/about/sponsor-11.png"
              alt="Sponsor 11"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[60px] w-[160px] flex-shrink-0 md:h-[76px] md:w-[220px]">
            <Image
              src="/assets/about/sponsor-7.png"
              alt="Sponsor 7"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Row 3 - 3 sponsors: one on each edge and one in middle */}
        <div className="flex items-center justify-between px-0 md:px-8">
          <div className="relative h-[60px] w-[55px] flex-shrink-0 md:h-[76px] md:w-[74px]">
            <Image
              src="/assets/about/sponsor-8.png"
              alt="Sponsor 8"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[60px] w-[110px] flex-shrink-0 md:h-[76px] md:w-[154px]">
            <Image
              src="/assets/about/sponsor-9.png"
              alt="Sponsor 9"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-[60px] w-[120px] flex-shrink-0 md:h-[76px] md:w-[165px]">
            <Image
              src="/assets/about/sponsor-10.png"
              alt="Sponsor 10"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Don't Miss a Beat Section
function DontMissABeatSection() {
  return (
    <section className="relative overflow-hidden bg-white py-[80px] md:py-0 md:h-[55vh]">
      {/* Wave pattern background */}
      <div className="pointer-events-none absolute inset-0 z-0 ">
        <Image
          src="/wave-in-contact.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-start px-5 md:px-[124px]">
        {/* Content */}
        <div className="flex max-w-[657px] flex-col gap-[18px]">
          <h2 className="font-heading text-[48px] font-bold uppercase leading-[100%] text-[#05365f] md:text-[64px]">
            DON&apos;T MISS A BEAT
          </h2>
          <p className="font-body text-[16px] leading-normal text-[#05365f] md:text-[20px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="mt-2 flex h-[58px] w-[310px] items-center justify-center rounded-[5px] bg-[#05365f] font-heading text-[20px] text-white transition-opacity hover:opacity-90 md:text-[22px]">
            STAY IN TOUCH
          </button>
        </div>

        {/* Record image - positioned on the right */}
        <div className="absolute right-[-235px] top-[100%] hidden h-[966px] w-[969px] -translate-y-1/2 md:block">
          <Image
            src="/record.png"
            alt="Vinyl record"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

