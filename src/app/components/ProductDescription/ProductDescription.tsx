import React from "react";
import "./ProductDescriptionStyle.css";

export default function ProductDescription() {
  const textAndImage = [
    {
      title: "Optimize Music for Tactile Sensation on the Body",
      description:
        "Made with patented technology and designed for an immersive experience",
      img: "image1.jpg",
    },
    {
      title: "Made to Look Like Daily Clothing",
      description:
        "Allowing you to not only feel good, but also look good in our wearable device.",
      img: "image2.jpg",
    },
    {
      title: "Experience of Music With You Anytime, Anywhere",
      description:
        "Powered with a portable battery and easily fitted in your outfits for a full day of use.",
      img: "image3.jpg",
    },
  ];

  return (
    <div className="product-description">
      {textAndImage.map((item, index) => (
        <div
          key={index}
          className={`product-section ${
            index % 2 === 0 ? "normal" : "reverse"
          }`}
        >
          <div className="text-container">
            <h2 className="section-title">{item.title}</h2>
            <p className="section-description">{item.description}</p>
          </div>
          <div className="image-container">
            {/* <img src={item.img} alt={item.title} className="section-image" /> */}
          </div>
        </div>
      ))}
    </div>
  );
}
