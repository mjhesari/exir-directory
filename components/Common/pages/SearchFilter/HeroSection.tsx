"use client"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const heroTypes = {
  slider: {
    type: 'slider',
    content: [
      {
        image: "https://dkstatics-public.digikala.com/digikala-adservice-banners/b6d72568ff581fc6e0db4d9f8d747ea953c0a0ff_1739374822.jpg?x-oss-process=image/quality,q_95/format,webp",
        title: "Discover Amazing Experiences",
        description: "Explore curated collections across various categories"
      },
      {
        image: "https://dkstatics-public.digikala.com/digikala-adservice-banners/15763da6eef938ec760cac5a9e9910a7eeae99b7_1739798841.gif?x-oss-process=image?x-oss-process=image/format,webp",
        title: "Connect with Professionals",
        description: "Build meaningful relationships in your industry"
      },
      {
        image: "https://dkstatics-public.digikala.com/digikala-adservice-banners/b6d72568ff581fc6e0db4d9f8d747ea953c0a0ff_1739374822.jpg?x-oss-process=image/quality,q_95/format,webp",
        title: "Grow Your Network",
        description: "Expand your horizons with our community"
      }
    ]
  },
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);

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
    const swipeThreshold = 50; // حداقل میزان حرکت برای تشخیص سوایپ

    if (touchStartX - touchEndX > swipeThreshold) {
      // سوایپ به چپ (اسلاید بعدی)
      setIsAutoPlaying(false);
      setCurrentSlide((prev) => (prev + 1) % heroTypes.slider.content.length);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // سوایپ به راست (اسلاید قبلی)
      setIsAutoPlaying(false);
      setCurrentSlide((prev) => (prev - 1 + heroTypes.slider.content.length) % heroTypes.slider.content.length);
    }
  };

  return (
    <section
      className="relative h-[50vh] flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 z-10" />

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
            src={heroTypes.slider.content[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover"
            fill
          />
        </motion.div>
      </AnimatePresence>

      {/* ناوبری */}
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
                  className="h-full bg-white rounded-full"
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
