"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import imgexirland from "@/public/hero/exir-land.jpg";
import imgexirmo from "@/public/hero/exir-mobile.jpg";
import imgekakhland from "@/public/hero/kakh-land.jpg";
import imgkakhmo from "@/public/hero/kakh-mobile.jpg";
import imgramezanland from "@/public/hero/ramezan-land.jpg";
import imgramezanmo from "@/public/hero/ramezan-mobile.jpg";
import useMediaQuery from "@/hooks/use-media-query";
const heroTypes = {
  slider: {
    type: "slider",
    content: [
      {
        image: { land: imgexirland, mobile: imgexirmo },
        title: "Discover Amazing Experiences",
        description: "Explore curated collections across various categories",
      },
      {
        image: { land: imgekakhland, mobile: imgkakhmo },
        title: "Connect with Professionals",
        description: "Build meaningful relationships in your industry",
      },
      {
        image: { land: imgramezanland, mobile: imgramezanmo },
        title: "Grow Your Network",
        description: "Expand your horizons with our community",
      },
    ],
  },
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const isMoblie = useMediaQuery("(max-width: 1024px)");
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroTypes.slider.content.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isAutoPlaying]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      setIsAutoPlaying(false);
      setCurrentSlide((prev) => (prev + 1) % heroTypes.slider.content.length);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      setIsAutoPlaying(false);
      setCurrentSlide(
        (prev) =>
          (prev - 1 + heroTypes.slider.content.length) %
          heroTypes.slider.content.length
      );
    }
  };

  return (
    <section
      className="relative h-[50vh] flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={
              isMoblie
                ? heroTypes.slider.content[currentSlide].image.mobile
                : heroTypes.slider.content[currentSlide].image.land
            }
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-center relative overflow-hidden "
            fill
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-x-3">
          {heroTypes.slider.content.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
              }}
              className="group relative"
            >
              <div className="w-12 h-1 bg-white/30 overflow-hidden rounded-full">
                <motion.div
                  animate={{
                    width: currentSlide === index ? "100%" : "0%",
                    opacity: currentSlide === index ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full bg-white rounded-full"

                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
