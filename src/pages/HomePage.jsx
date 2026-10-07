import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { CircularCollectionNav } from '../components/home/CircularCollectionNav';
import {
  CollectionIntro,
  SignatureEdit,
  EditorialParallax,
  SplitMotion,
  MarqueeSection,
  NewArrivalsSlider,
  BestsellersIcons,
  CraftsmanshipStages,
  MaterialsSection,
  TestimonialsSection,
  InstagramMasonry
} from '../components/home/HomeSections';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* 80vh Cinematic Hero Slider */}
      <HeroSlider />

      {/* Collection Introduction */}
      <CollectionIntro />

      {/* Signature Circular Collection Navigation */}
      <CircularCollectionNav />

      {/* Filterable Signature Edit */}
      <SignatureEdit />

      {/* Full-width Editorial Parallax */}
      <EditorialParallax />

      {/* Split Motion Craftsmanship */}
      <SplitMotion />

      {/* Infinite Horizontal Marquee */}
      <MarqueeSection />

      {/* New Arrivals Slider */}
      <NewArrivalsSlider />

      {/* Bestseller Icons */}
      <BestsellersIcons />

      {/* 3-Stage Craftsmanship Protocol */}
      <CraftsmanshipStages />

      {/* Noble Materials Archive */}
      <MaterialsSection />

      {/* Client Praise & Testimonials */}
      <TestimonialsSection />

      {/* Curated Social Stories */}
      <InstagramMasonry />
    </div>
  );
};
