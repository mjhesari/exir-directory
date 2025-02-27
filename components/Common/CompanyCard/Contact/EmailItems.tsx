"use client";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import { useRef } from "react";
import Copier from "@/components/Common/mirrors/Copy-Button";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
// import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
export type ContactItemTypes = {
  content: string;
};
const EmailItems = ({
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
            {content}
          </p>
          <div className="flex gap-x-1" ref={contentRef} title={content}>
            <Copier value={content} />
            <Button
              size="sm"
              isIconOnly
              radius="full"
              className="border-1 bg-transparent border-indigo-500 text-indigo-500"
            >
              <Icon icon="solar:letter-linear" width="20" />
            </Button>
          </div>
        </div>
    </div>
  );
};

export default EmailItems;
