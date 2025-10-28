import Image from "next/image";
import Carousel from "./components/Carousel/Carousel";
import CustomMasonry from "./components/CustomMasonry/CustomMasonry";
import ProductDescription from "./components/ProductDescription/ProductDescription";
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
            position: "absolute",
            top: "50vh",
            width: "100%",
            height: "100%",
            zIndex: 1,
            overflow: "hidden",
          }}
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
        <ProductDescription />
        <div className="tag-line-container">
          <div className="tag-line">
            <h1 className="tag-line-text">IMPRESSIONS FROM THE COMMUNITY</h1>
          </div>
        </div>
        <CustomMasonry />
      </div>
    </div>
  );
}
