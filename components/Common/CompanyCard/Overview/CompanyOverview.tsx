import { Card } from "@nextui-org/card";
import { Business } from "@/types/dataTypes";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import Image from "next/image";
import { Icon } from "@iconify/react";

export function CompanyOverview({
  exchangeData,
  dicts,
}: {
  exchangeData: Business;
  dicts: DictsTypes;
}) {
  return (
    <Card
      className="flex lg:items-start justify-center border p-4 py-8"
      shadow="none"
    >
      <div className=" grid md:grid-cols-[max-content_auto] place-items-center gap-8 mx-4">
      {process.env.NEXT_PUBLIC_DIRECTORY === "exchange" && 
      exchangeData?.image ? (
          <div className="relative h-40 flex justify-center items-center flex-col">
          <Image
            alt={exchangeData?.image ?? ""}
            className="rounded-full object-cover aspect-square"
            src={exchangeData?.image ?? ""}
            width={140}
            height={140}
            />
            </div>
        ) : (
          <div className="object-cover aspect-square rounded-full h-36 bg-default-300 flex justify-center items-center flex-col">
            <Icon
              icon="carbon:no-image"
              className="text-white"
              width="32"
              height="32"
            />
          </div>
)}
        <div>
          <div className="flex flex-col text-center items-center md:flex-row md:items-start md:text-start gap-2">
            <div>
              <h2 className="text-xl font-semibold leading-none">
                {exchangeData?.name?.[
                  (dicts?.lang as keyof typeof exchangeData.name) ?? "en"
                ] || "No name available"}
              </h2>
            </div>
          </div>
          <article>
            <div className="flex flex-row space-x-5 items-center"></div>
            <p className="mt-4 text-sm text-muted-foreground">
              {" "}
              {exchangeData?.description?.[
                dicts?.lang as keyof typeof exchangeData.description
              ] || "No description available"}
            </p>
          </article>
        </div>
      </div>
    </Card>
  );
}
