"use client";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useRef } from "react";
import { convertToPhoneNumber } from "@/utils/functions/functions";
import Copier from "@/components/Common/mirrors/Copy-Button";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import Link from "next/link"
// import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
export type ContactItemTypes = {
  content: string;
};
const ContactItems = ({
  content,
  dicts,
}: ContactItemTypes  & {dicts :DictsTypes}) => {
  const contentRef = useRef<HTMLHeadingElement>(null);
  return (
    <div className="space-y-3">
        <div
          className="flex items-center justify-between bg-gray-500/15 rounded-xl p-2"
        >
          <p 
          dir="ltr"
          className={`${
          dicts?.dir === 'ltr' ? 'text-start' : 'text-end'
        } text-base text-gray-700 leading-none`}>
            {convertToPhoneNumber(content?? "")  }
          </p>
          <div className="flex gap-x-1" ref={contentRef} title={content}>
            <Copier value={content} />
            <Button
              size="sm"
              isIconOnly
              radius="sm"
              className="border-1 bg-transparent border-indigo-500 text-indigo-500 items-center justify-center"
            >
              <Icon icon="mingcute:phone-line" className="rounded-full" width="20" />
              <Link
            href={`tel:${content}`}
            className="absolute inset-0"
          />
            </Button>
          </div>
        </div>
    </div>
  );
};

export default ContactItems;
