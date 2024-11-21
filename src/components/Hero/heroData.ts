// src/data/heroData.ts

export interface SlideData {
   image: string;
   title: string;
   description: string;
   ctaText: string;
   ctaLink: string;
 }

 export const heroSlides: SlideData[] = [
   {
   //   image: "/assets/Hero/veil-1.webp",
     image: "src/assets/Hero/veil-1.webp",
     title: "Discover Innovation",
     description: "Explore cutting-edge solutions that transform your digital experience",
     ctaText: "Learn More",
     ctaLink: "#learn-more"
   },
   {
     image: "src/assets/Hero/veil-2.webp",
     title: "Build the Future",
     description: "Create powerful applications with our advanced technology stack",
     ctaText: "Start Building",
     ctaLink: "#start-building"
   },
   {
     image: "src/assets/Hero/veil-3.webp",
     title: "Expert Support",
     description: "Get dedicated assistance from our team of experienced developers",
     ctaText: "Contact Us",
     ctaLink: "#contact"
   }
 ];