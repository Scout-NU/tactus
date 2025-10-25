import Carousel from "./components/Carousel/Carousel";
import CustomMasonry from "./components/CustomMasonry/CustomMasonry";
import ProductDescription from "./components/ProductDescription/ProductDescription";
import "./HomePage.css";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-page-content">
        <div className="product-info">
          <div className="product-text">
            <h1 className="product-info-text">
              WEARABLE TECH DEVELOPED WITH AND FOR THE DEAF COMMUNITY
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="learn-more-button">Learn More</button>
          </div>
          <div className="product-image-container">
            <div className="product-image"></div>
          </div>
        </div>
        <Carousel />
        <div className="tag-line-container">
          <div className="tag-line">
            <h1 className="tag-line-text">
              TRANSFORMING THE WAY MUSIC IS EXPERIENCED
            </h1>
          </div>
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
