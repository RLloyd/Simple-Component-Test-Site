import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import './Hero.scss';

interface SlideData {
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroProps {
  slides: SlideData[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero">
      {slides.map((content, index) => (
        <div
          key={index}
          className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
        >
          <img
            src={content.image}
            alt={content.title}
            className="hero__image"
          />
          <div className="hero__overlay">
            <div className="hero__content">
              <h1 className="hero__title">{content.title}</h1>
              <p className="hero__description">{content.description}</p>
              <a href={content.ctaLink} className="hero__cta">
                {content.ctaText}
              </a>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="hero__arrow hero__arrow--prev"
        aria-label="Previous slide"
      >
        <IoIosArrowBack />
      </button>

      <button
        onClick={nextSlide}
        className="hero__arrow hero__arrow--next"
        aria-label="Next slide"
      >
        <IoIosArrowForward />
      </button>

      <div className="hero__dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`hero__dot ${index === currentSlide ? 'hero__dot--active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;