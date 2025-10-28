import Image from "next/image";
import Carousel from "./components/Carousel/Carousel";
import "./HomePage.css";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-page-content">
        <div className="product-overview">
          <div className="product-info">
            <div className="product-text">
              <h1 className="product-info-text">
                WEARABLE TECH DEVELOPED{" "}
                <span className="product-info-orange-text">WITH</span> AND{" "}
                <span className="product-info-orange-text">FOR</span> THE DEAF
                COMMUNITY
              </h1>
              <p className="product-description-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="learn-more-button">LEARN MORE</button>
            </div>
          </div>
          <div
            className="product-image-container"
            style={{
              backgroundImage: 'url("/product-home-photo.png")',
              backgroundSize: "cover",
              position: "absolute",
              right: -235,
              zIndex: -1,
            }}
          ></div>
        </div>
        <div
          style={{
            top: "50vh",
          }}
          className="wave-pattern-orange"
        >
          <Image
            alt="wave pattern"
            src="/wave-pattern.svg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="tag-line-container">
          <div className="tag-line">
            <h1 className="tag-line-text">
              TRANSFORMING THE WAY MUSIC IS EXPERIENCED.
            </h1>
            <p className="tag-line-description">
              We’re providing a new medium that allows deaf and hard-of-hearing
              individuals to truly enjoy music and connect with one another
              through shared musical experiences.
            </p>
          </div>
          <div className="features">
            <div className="features-list">
              {[
                "This is a feature",
                "This is a feature2",
                "This is a feature3",
              ].map((feature) => (
                <div key={feature} className="feature-item">
                  <Image src={"Star.svg"} alt="star" width={35} height={33} />
                  <p className="feature-text">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="learn-more-button orange">LEARN MORE</button>
        </div>
        <div className="community-section">
          <div
            className="community-content"
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="community-text">
              <h1 className="community-header">
                IMPRESSIONS FROM THE COMMUNITY
              </h1>
              <h2 className="community-quote">
                “I feel like my soul is moving.”
              </h2>
            </div>
            <div className="carousel-content">
              <div className="people-carousel">
                <Carousel
                  items={[
                    <Image
                      src={"/community-images/Person1.png"}
                      alt="afya"
                      key={1}
                      width={303}
                      height={540}
                    />,
                    <Image
                      src={"/community-images/Person2.png"}
                      alt="idea venture accelerator"
                      key={2}
                      width={283}
                      height={540}
                    />,
                    <Image
                      src={"/community-images/Person3.png"}
                      alt="mass challenge"
                      key={3}
                      width={294}
                      height={540}
                    />,
                    <Image
                      src={"/community-images/Person4.png"}
                      alt="sherman center"
                      key={4}
                      width={282}
                      height={540}
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
            top: "190vh",
          }}
          className="wave-pattern-blue"
        >
          <Image
            alt="wave pattern"
            src="/blue-waves.svg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            top: "260vh",
          }}
          className="wave-pattern-orange"
        >
          <Image
            alt="wave pattern"
            src="/wave-pattern.svg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
