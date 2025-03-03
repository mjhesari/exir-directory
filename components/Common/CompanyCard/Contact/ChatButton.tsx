"use client"
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { colorByType, iconMap } from "@/utils/data/data";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const ChatButton = ({
  dicts,
  type,
  url,
}: {
  dicts: DictsTypes;
  type: string;
  url: string;
}) => {
  const getTitle = (type: string) => {
    const translation = dicts?.button?.type;
    return translation?.[type as keyof typeof translation] || type;
  };

  return (
    <Button
      fullWidth
      className={ `${colorByType[type]} rounded-xl`}
      startContent={
        <Icon icon={iconMap[type] || "ri:question-fill"} width="24" />}
      size="lg"
    >
      <span className="relative">{getTitle(type ?? "")}</span>
      <Link href={url ?? ""} prefetch={false} className="absolute inset-0" />
    </Button>
  );
};

export default ChatButton;
