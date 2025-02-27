import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Business } from "@/types/dataTypes";
import { Card } from "@nextui-org/react";
import Image from "next/image";

const CompanyHero = ({
  exchangeData,
  dicts
}: {
  exchangeData: Business;
  dicts: DictsTypes;
}) => {
  return (
    <Card className="items-center justify-center border h-[50vh] max-h-[600px] relative bg-white" shadow="none">

      <div className=" grid md:grid-cols-[max-content_auto] place-items-center gap-8 mx-4">
        {exchangeData.image && (
            <Image
              alt={exchangeData?.image ?? ""}
              className="object-cover"
              src={exchangeData?.image ?? ""} 
              fill
            />
        )}
      </div>
      <div
          className={`absolute inset-0 ${
            dicts.dir === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"
          }  bg-[#22273163] z-10`}
          data-aos="fade-left"
          data-aos-delay="300"
        />
    </Card>
  );
};

export default CompanyHero;
