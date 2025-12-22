"use client";

import Image from "next/image";
import Carousel from "./components/Carousel/Carousel";
import "./HomePage.css";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HubSpotPopup from "./components/HubSpotPopup/HubSpotPopup";
import type { HomepageData, VideoItem } from "./homeData";

// Wave pattern imports (static - never change, performance-critical)
import waveInLanding from "@/app/_assets/shared/waves/wave-in-landing.svg";
import waveInCommunity from "@/app/_assets/shared/waves/wave-in-community.svg";
import wave2InCommunity from "@/app/_assets/shared/waves/wave-2-in-community.svg";
import waveInContact from "@/app/_assets/shared/waves/wave-in-contact.svg";

// Brand assets (static)
import recordImage from "@/app/_assets/shared/brand/record.png";

// Product images (static)
import productHomePhoto from "@/app/_assets/shared/product-images/product-home-photo.png";
import shopVestImage from "@/app/_assets/shared/product-images/shop-vest.png";

interface HomePageClientProps {
  data: HomepageData;
}

export default function HomePageClient({ data }: HomePageClientProps) {
  const router = useRouter();
  const [isHubSpotPopupOpen, setIsHubSpotPopupOpen] = useState(false);

  // Helper function to render heading with highlighted words
  const renderHeading = (
    text: string,
    highlights: readonly string[]
  ): React.ReactNode => {
    const words = text.split(" ");
    return words.map((word, index) => {
      const isHighlight = highlights.includes(word);
      return (
        <span key={index}>
          {isHighlight ? (
            <span className="product-info-blue-text">{word}</span>
          ) : (
            word
          )}
          {index < words.length - 1 ? " " : ""}
        </span>
      );
    });
  };

  // Build product cards with static images and Contentful pricing/names
  const productCards = [
    {
      name: data.products.jacketName,
      originalPrice: data.pricing.jacketOriginal,
      currentPrice: data.pricing.jacketCurrent,
      image: productHomePhoto,
      route: "/shop/jacket",
    },
    {
      name: data.products.vestName,
      originalPrice: data.pricing.vestOriginal,
      currentPrice: data.pricing.vestCurrent,
      image: shopVestImage,
      route: "/shop/vest",
    },
  ];

  return (
    <div className="home-page">
      <div className="home-page-content">
        <div className="product-overview">
          <div className="product-info">
            <div className="product-text">
              <h1 className="product-info-text">
                {renderHeading(data.hero.heading, data.hero.highlightWords)}
              </h1>
              <p className="product-description-text">{data.hero.subtext}</p>
              <button
                className="learn-more-button orange"
                style={{ zIndex: 2 }}
                onClick={() => {
                  router.push(data.hero.ctaLink);
                }}
              >
                {data.hero.ctaText}
              </button>
            </div>
          </div>
          {/* Hero product image - always keep vest class for positioning, add Contentful image if provided */}
          <div
            className="product-image-container vest"
            style={
              data.hero.productImageUrl
                ? {
                    backgroundImage: `url(${data.hero.productImageUrl})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          />
          <div
            style={{
              top: "18vh",
            }}
            className="wave-pattern-orange first"
          >
            <Image
              alt="wave pattern"
              src={waveInLanding}
              fill
              style={{
                objectFit: "cover",
                zIndex: -1,
              }}
            />
          </div>
        </div>

        <div className="community-section">
          <div className="community-content">
            <div className="community-text">
              <h1 className="community-header">{data.community.heading}</h1>
              <h2 className="community-quote">{data.community.quote}</h2>
            </div>
            <div className="carousel-content">
              <div className="people-carousel">
                <Carousel
                  items={data.videos.map((video) => (
                    <ClickToPlayVideo key={video.id} video={video} />
                  ))}
                  gap={25}
                />
              </div>
              <div className="sponsor-carousel items-top">
                <Carousel
                  items={data.sponsors.map((sponsor, index) => (
                    <Image
                      key={index}
                      src={sponsor.src}
                      alt={sponsor.alt}
                      width={200}
                      height={60}
                      style={{ height: "60px", width: "auto" }}
                    />
                  ))}
                  gap={64}
                  autoScroll={true}
                  scrollSpeed={40}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            top: "150vh",
          }}
          className="wave-pattern-blue first"
        >
          <Image
            alt="wave pattern"
            src={waveInCommunity}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            top: "200vh",
          }}
          className="wave-pattern-blue second"
        >
          <Image
            alt="wave pattern"
            src={wave2InCommunity}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="products-section-wrapper">
          <div className="products-section">
            <div className="products-section-text">
              <h1 className="products-header">{data.products.heading}</h1>
              <p className="products-description">{data.products.description}</p>
            </div>
            <div className="products-list">
              {productCards.map((product) => (
                <div key={product.name} className="product-item-container">
                  <div className="product-item">
                    <div className="product-display-container">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={224}
                        height={224}
                        className="product-image"
                      />
                    </div>
                    <div className="product-description">
                      <div className="product-properties">
                        <h2 className="product-name">{product.name}</h2>
                        <div>
                          <p
                            style={{
                              textDecoration: "line-through",
                              color: "#f06532",
                            }}
                          >
                            {product.originalPrice}
                          </p>
                          <p>{product.currentPrice}</p>
                        </div>
                      </div>
                      <button
                        className="learn-more-button small"
                        onClick={() => {
                          router.push(product.route);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <div
            className="contact-form-overview"
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <div className="contact-form-info">
              <div className="contact-form-text">
                <h1 className="contact-form-info-text">
                  {data.contact.heading}
                </h1>
                <p className="contact-form-description-text">
                  {data.contact.description}
                </p>
                <div className="contact-form-input">
                  <button
                    className="learn-more-button"
                    style={{ zIndex: 10, position: "relative" }}
                    onClick={() => setIsHubSpotPopupOpen(true)}
                  >
                    {data.contact.ctaText}
                  </button>
                </div>
              </div>
            </div>
            <div
              className="product-image-container record"
              style={{
                backgroundImage: `url(${recordImage.src})`,
                backgroundSize: "cover",
                position: "absolute",
                right: -235,
              }}
            ></div>
          </div>
        </div>
        <div
          style={{
            top: "350vh",
          }}
          className="wave-pattern-orange second"
        >
          <Image
            alt="wave pattern"
            src={waveInContact}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* HubSpot Form Popup */}
      <HubSpotPopup
        isOpen={isHubSpotPopupOpen}
        onClose={() => setIsHubSpotPopupOpen(false)}
      />
    </div>
  );
}

// Click-to-play video component with pause/play toggle
function ClickToPlayVideo({ video }: { video: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="video-container" onClick={handleTogglePlay}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={video.poster}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      {/* Play button overlay - shown when paused */}
      {!isPlaying && (
        <div className="play-button-overlay" aria-label={`Play ${video.alt}`}>
          <span className="play-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </span>
        </div>
      )}
      {/* Pause overlay - shown on hover when playing (desktop only) */}
      {isPlaying && (
        <div className="pause-overlay" aria-label={`Pause ${video.alt}`}>
          <span className="pause-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
}
