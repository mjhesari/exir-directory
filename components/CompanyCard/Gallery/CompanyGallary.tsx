"use client";

import Fancybox from "./fancy-box";
import Link from "next/link";
import { Business } from "@/types/dataTypes";
import Image from "next/image";
import { Card } from "@nextui-org/react";

const CompanyGallery = ({ exchangeData }: { exchangeData: Business }) => {
  const images = [
    "row-span-2 col-span-2",
    "row-span-1 col-span-2",
    "row-span-1 col-span-1",
    "row-span-1 col-span-1",
  ];
if(!exchangeData?.media?.length) return null


  return (
    <Card className="items-center justify-center border h-[60vh] max-h-[600px] relative bg-white" shadow="none">
      <Fancybox
      delegate="[data-fancybox]"
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <div className="absolute inset-4 grid grid-cols-4 lg:grid-rows-2 gap-5 place-items-center">
          {exchangeData?.media?.map((image, index) => {
            const isOverflow = index > 3;
            const isOverflowStyle = `${
              isOverflow ? "absolute h-0 w-0" : "relative h-full w-full"
            }`;
            const isLastone = index === 3 && exchangeData.media && exchangeData?.media?.length - 4;
            return (
              <div
                key={image?.src ?? index}
                className={`rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer w-full  ${
                  images[index] ?? ""
                } ${isOverflowStyle}`}
              >
                <Link
                  className="block h-full w-full"
                  data-fancybox="gallery"
                  data-caption={image.title}
                  href={image.src}
                >
                  <div className={`group overflow-hidden`}>
                    <Image
                    sizes="100vh"
                      src={image.src}
                      alt={image.title}
                      fill
                      className="inset-0 object-cover rounded-lg"
                    />
                    {isLastone ? (
                      <div className="bg-black/30 grid place-items-center absolute inset-0 text-6xl z-20 text-white rounded-lg ">
                        {exchangeData.media && exchangeData?.media?.length - 4
                          ? `+${
                              exchangeData.media
                                ? exchangeData?.media?.length - 4
                                : 0
                            }`
                          : ""}
                      </div>
                    ) : null}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Fancybox>
    </Card>
  );
};

export default CompanyGallery;
