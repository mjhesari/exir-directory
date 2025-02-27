"use client"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
const heroTypes={
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
},}
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % heroTypes.slider.content.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, heroTypes.slider.content.length, isAutoPlaying, setCurrentSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-10" />   
      <AnimatePresence initial={false} custom={1}>
        <motion.div
          key={currentSlide}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 }
          }}
          className="absolute inset-0 "
        >
          <Image
            src={heroTypes?.slider?.content?.[currentSlide]?.image}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover"
            fill
          />
        </motion.div>
      </AnimatePresence>
      {/* Minimal Navigation */}
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
                  initial={false}
                  animate={{
                    width: currentSlide === index ? "100%" : "0%",
                    opacity: currentSlide === index ? 1 : 0.3
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
  export default HeroSection

