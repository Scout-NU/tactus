"use client";

import Image from "next/image";
import Carousel from "./components/Carousel/Carousel";
import "./HomePage.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HubSpotPopup from "./components/HubSpotPopup/HubSpotPopup";

export default function Home() {
  const router = useRouter();
  const [isHubSpotPopupOpen, setIsHubSpotPopupOpen] = useState(false);

  return (
    <div className="home-page">
      <div className="home-page-content">
        <div className="product-overview">
          <div className="product-info">
            <div className="product-text">
              <h1 className="product-info-text">
                YOU DON’T NEED TO{" "}
                <span className="product-info-blue-text">HEAR</span> THE MUSIC
                TO <span className="product-info-blue-text">FEEL</span> IT.{" "}
              </h1>
              <p className="product-description-text">
                Wearable tech developed with and for the Deaf community.{" "}
              </p>
              <button
                className="learn-more-button orange"
                style={{ zIndex: 2 }}
                onClick={() => {
                  router.push("/product");
                }}
              >
                LEARN MORE
              </button>
            </div>
          </div>
          <div className="product-image-container vest" />
          <div
            style={{
              top: "18vh",
            }}
            className="wave-pattern-orange first"
          >
            <Image
              alt="wave pattern"
              src="/wave-in-landing.svg"
              fill
              priority
              style={{
                objectFit: "cover",
                zIndex: -1,
              }}
            />
          </div>
        </div>
        {/* <div className="blue-pixels">
          <Image
            alt="blue pixels"
            src="/pixels/left.svg"
            width={515}
            height={360}
          />
          <Image
            alt="blue pixels"
            src="/pixels/middle.svg"
            width={254}
            height={304}
          />
          <Image
            alt="blue pixels"
            src="/pixels/right.svg"
            width={515}
            height={360}
          />
        </div> */}

        <div className="community-section">
          <div className="community-content">
            <div className="community-text">
              <h1 className="community-header">
                TRANSFORMING THE WAY MUSIC IS EXPERIENCED.
              </h1>
              <h2 className="community-quote">
                “I feel like my soul is moving.”
              </h2>
            </div>
            <div className="carousel-content">
              <div className="people-carousel">
                <Carousel
                  items={[
                    <LazyVideo
                      key={1}
                      src="/Alleyna_Tactus.mp4"
                      poster="/Alleyna_Tactus-poster.jpg"
                    />,
                    <LazyVideo
                      key={2}
                      src="/Ashwin_Tactus.mp4"
                      poster="/Ashwin_Tactus-poster.jpg"
                    />,
                    <LazyVideo
                      key={3}
                      src="/Dancing_Testing.mp4"
                      poster="/Dancing_Testing-poster.jpg"
                    />,
                    <LazyVideo
                      key={4}
                      src="/Sign_Tactus.mp4"
                      poster="/Sign_Tactus-poster.jpg"
                    />,
                  ]}
                  gap={25}
                />
              </div>
              <div className="sponsor-carousel">
                <Carousel
                  items={[
                    <Image
                      src={"/carousel-sponsor-images/affya.png"}
                      alt="afya"
                      key={1}
                      width={167}
                      height={76}
                    />,
                    <Image
                      src={"/carousel-sponsor-images/idea-venture.png"}
                      alt="idea venture accelerator"
                      key={2}
                      width={168}
                      height={76}
                    />,
                    <Image
                      src={"/carousel-sponsor-images/mass-challenge.png"}
                      alt="mass challenge"
                      key={3}
                      width={92}
                      height={76}
                    />,
                    <Image
                      src={"/carousel-sponsor-images/sherman-center.png"}
                      alt="sherman center"
                      key={4}
                      width={224}
                      height={42}
                    />,
                    <Image
                      src={"/carousel-sponsor-images/y-startup.png"}
                      alt="y startup school"
                      key={5}
                      width={190}
                      height={76}
                    />,
                  ]}
                  gap={64}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            top: "130vh",
          }}
          className="wave-pattern-blue first"
        >
          <Image
            alt="wave pattern"
            src="/wave-in-community.svg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            top: "160vh",
          }}
          className="wave-pattern-blue second"
        >
          <Image
            alt="wave pattern"
            src="/wave-2-in-community.svg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="products-section-wrapper">
          <div className="products-section">
            <div className="products-section-text">
              <h1 className="products-header">OUR PRODUCTS</h1>
              <p className="products-description">
              Experience music through touch. Our wearables transform every beat into a physical sensation, bringing you closer to the music you love.
              </p>
            </div>
            <div className="products-list">
              {[
                {
                  name: "CODEC JACKET",
                  price: (
                    <>
                      <p
                        style={{
                          textDecoration: "line-through",
                          color: "#f06532",
                        }}
                      >
                        $500
                      </p>
                      <p>$469</p>
                    </>
                  ),
                  image: "/product-image.png",
                  route: "/shop/jacket",
                },
                {
                  name: "CODEC VEST",
                  price: (
                    <>
                      <p
                        style={{
                          textDecoration: "line-through",
                          color: "#f06532",
                        }}
                      >
                        $500
                      </p>
                      <p>$469</p>
                    </>
                  ),
                  image: "/product-image.png",
                  route: "/shop/vest",
                },
              ].map((product, index) => (
                <div
                  key={product.name}
                  className="product-item-container"
                >
                  <div className="product-item">
                    <div className="product-display-container">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={224}
                        height={224}
                        priority={index === 0}
                        className="product-image"
                      />
                    </div>
                    <div className="product-description">
                      <div className="product-properties">
                        <h2 className="product-name">{product.name}</h2>
                        <div>{product.price}</div>
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
                  DON&apos;T MISS A BEAT
                </h1>
                <p className="contact-form-description-text">
                Stay connected for early access to news from the Tactus team.
                </p>
                <div className="contact-form-input">
                  <button
                    className="learn-more-button"
                    style={{ zIndex: 10, position: "relative" }}
                    onClick={() => setIsHubSpotPopupOpen(true)}
                  >
                    STAY IN TOUCH
                  </button>
                  {/* <input
                    type="text"
                    placeholder="example@provider.com"
                    className="contact-form-text-input"
                  />
                  <button className="contact-form-submit-button">
                    <Image
                      alt="wave pattern"
                      src="/Arrow.svg"
                      width={20}
                      height={20}
                    />
                  </button> */}
                </div>
              </div>
            </div>
            <div
              className="product-image-container record"
              style={{
                backgroundImage: 'url("/record.png")',
                backgroundSize: "cover",
                position: "absolute",
                right: -235,
              }}
            ></div>
          </div>
        </div>
        <div
          style={{
            top: "310vh",
          }}
          className="wave-pattern-orange second"
        >
          <Image
            alt="wave pattern"
            src="/wave-in-contact.svg"
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

// LazyVideo component - only loads videos when they're visible in viewport
function LazyVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is visible
            if (!hasLoadedRef.current) {
              // Load video only once
              video.load();
              hasLoadedRef.current = true;
            }
            video.play().catch(() => {});
          } else {
            // Video is not visible, pause it but don't reload
            video.pause();
          }
        });
      },
      { threshold: 0.25 } // Load when 25% visible
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      width={303}
      height={540}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      style={{ objectFit: "cover" }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
