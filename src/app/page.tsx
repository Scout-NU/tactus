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
                YOU DON’T NEED TO{" "}
                <span className="product-info-orange-text">HEAR</span> THE MUSIC
                TO <span className="product-info-orange-text">FEEL</span>{" "}
                IT.{" "}
              </h1>
              <p className="product-description-text">
                Wearable tech developed with and for the deaf community.{" "}
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
        <div className="products-section">
          <div className="products-section-text">
            <h1 className="products-header">OUR PRODUCTS</h1>
            <p className="products-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="products-list">
            {[
              {
                name: "TACTUS CODEC VEST",
                price: "$99",
                image: "/product-image.png",
              },
              {
                name: "TACTUS CODEC VEST",
                price: "$199",
                image: "/product-image.png",
              },
            ].map((product) => (
              <div
                key={product.name + product.price}
                className="product-item-container"
              >
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
                      <p>{product.price}</p>
                    </div>
                    <button className="learn-more-button small">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
                  DON&#39;T MISS A BEAT
                </h1>
                <p className="contact-form-description-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="contact-form-input">
                  <input
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
                  </button>
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
            top: "405vh",
          }}
          className="wave-pattern-orange"
        >
          <Image
            alt="wave pattern"
            src="/orange-waves.svg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="bottom-padding"></div>
      </div>
    </div>
  );
}
