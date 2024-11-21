// src/components/Hero/Hero.tsx : using useCallback

import { useState, useEffect, useCallback } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SlideData } from './heroData';
import './Hero.scss';

interface HeroProps {
  slides: SlideData[];
}

const Hero = ({ slides }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="hero" role="region" aria-label="Featured content slider">
      <div className="slider" aria-live="polite">
        {slides.map((content, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${content.image})` }}
          >
            <div className="slide-content">
              <h2>{content.title}</h2>
              <p>{content.description}</p>
              <a href={content.ctaLink} className="cta-button">
                {content.ctaText}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-nav" role="navigation" aria-label="Slider navigation">
        <button
          className="prev"
          aria-label="Previous slide"
          title="View previous slide"
          onClick={prevSlide}
        >
          <span className="sr-only">Previous slide</span>
          <IoIosArrowBack />
        </button>
        <button
          className="next"
          aria-label="Next slide"
          title="View next slide"
          onClick={nextSlide}
        >
          <span className="sr-only">Next slide</span>
          <IoIosArrowForward />
        </button>
      </div>
    </section>
  );
};

export default Hero;

// // src/components/Hero/Hero.tsx

// import { useState, useEffect } from 'react';
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { SlideData } from '../../data/heroData';
// import './Hero.scss';

// interface HeroProps {
//   slides: SlideData[];
// }

// const Hero = ({ slides }: HeroProps) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   useEffect(() => {
//     const timer = setInterval(nextSlide, 5000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   return (
//     <section className="hero" role="region" aria-label="Featured content slider">
//       <div className="slider" aria-live="polite">
//         {slides.map((content, index) => (
//           <div
//             key={index}
//             className={`slide ${index === currentSlide ? 'active' : ''}`}
//             style={{ backgroundImage: `url(${content.image})` }}
//           >
//             <div className="slide-content">
//               <h2>{content.title}</h2>
//               <p>{content.description}</p>
//               <a href={content.ctaLink} className="cta-button">
//                 {content.ctaText}
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="slider-nav" role="navigation" aria-label="Slider navigation">
//         <button
//           className="prev"
//           aria-label="Previous slide"
//           title="View previous slide"
//           onClick={prevSlide}
//         >
//           <span className="sr-only">Previous slide</span>
//           <IoIosArrowBack />
//         </button>
//         <button
//           className="next"
//           aria-label="Next slide"
//           title="View next slide"
//           onClick={nextSlide}
//         >
//           <span className="sr-only">Next slide</span>
//           <IoIosArrowForward />
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Hero;