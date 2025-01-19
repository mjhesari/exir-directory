import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import  Image  from "next/image";
import { Icon } from "@iconify/react";
export function BusinessCard({
  dicts,
  image,
  title,
}: {
  dicts: DictsTypes;
  image: string;
  title: { [key: string]: string };
}) {
  return (
    <div className="cursor-pointer h-full">
      <div className="flex-col items-start p-0 rounded-b-none">
        {image ? (
          <div className="relative h-40">
          <Image
            alt={title?.[dicts?.lang ?? "fa"] ?? ""}
            className="rounded-lg object-cover rounded-b-none"
            src={image ?? ""}
            fill
            />
            </div>
        ) : (
          <div className="object-cover rounded-lg h-40 w-full bg-default-300 flex justify-center items-center flex-col rounded-b-none">
            <Icon
              icon="carbon:no-image"
              className="text-white"
              width="32"
              height="32"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col items-start justify-center p-1">
        <h4 className="font-light p-2">{title?.[dicts?.lang ?? "fa"] ?? ""}</h4>
      </div>
    </div>
  );
}
