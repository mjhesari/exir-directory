// import { Image } from "@nextui-org/react";
import Image from "next/image";

//* Import assets
import bannerImage from "@/public/photo_2024-11-21_18-21-41.jpg";

const MainBanner = () => {
  return (
    <section className="bg-[#282631] h-96 grid place-items-center overflow-hidden">
      <div className="container mx-auto relative h-full">
        <Image
          src={bannerImage.src}
          alt="hamester"
          fill
          className="!w-full"
        />
      </div>
    </section>
  );
};

export default MainBanner;
