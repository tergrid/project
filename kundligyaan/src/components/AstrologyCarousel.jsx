import React, { useEffect, useState } from "react";
import {
  Sun,
  Users,
  Flame,
  Cat,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


export default function AstrologyCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth || 0);
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setVisibleSlides(window.innerWidth >= 768 ? 4 : 2);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const services = [
    {
      icon: <Sun className="slide-icon" />,
      title: "Today's Horoscope",
      description: "Discover your daily Aries horoscope prediction online!",
    },
    /* Add remaining services here */
  ];

  const nextSlide = () => {
    if (startIndex < services.length - visibleSlides) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-header">COMPLIMENTARY ASTROLOGY SERVICES</h2>
      <div className="carousel-wrapper">
        <button
          onClick={prevSlide}
          disabled={startIndex === 0}
          className="carousel-button left"
          aria-label="Previous slides"
        >
          <ChevronLeft />
        </button>
        <div className="carousel-track">
          <div
            className="carousel-track-inner"
            style={{
              transform: `translateX(-${startIndex * (100 / visibleSlides)}%)`,
            }}
          >
            {services.map((service, index) => (
              <div key={index} className="carousel-slide">
                <div className="slide-icon">{service.icon}</div>
                <h3 className="slide-title">{service.title}</h3>
                <p className="slide-description">{service.description}</p>
                <div className="slide-indicator" />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={nextSlide}
          disabled={startIndex >= services.length - visibleSlides}
          className="carousel-button right"
          aria-label="Next slides"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
