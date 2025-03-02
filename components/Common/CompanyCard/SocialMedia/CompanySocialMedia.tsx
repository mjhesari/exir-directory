import { Icon } from "@iconify/react";
import { Card } from "@heroui/react";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Business } from "@/types/dataTypes";
import Link from "next/link";
import { iconMap } from "@/utils/data/data";

const CompanySocialMedia = ({
  exchangeData,
  dicts,
}: {
  exchangeData: Business;
  dicts: DictsTypes;
}) => {
  return (
    <Card className="flex border p-4" shadow="none">
      <h3 className="font-semibold text-lg px-1 mb-3">{dicts.socialNetwork}</h3>
      <div className="space-y-2" dir="ltr">
        {exchangeData.links?.map((e, index) => (
          <Link
            className="grid grid-cols-[max-content_auto_max-content] items-center gap-1 bg-gray-100/80 rounded-xl p-3"
            href={e.url.includes("//") ? e.url : `https://${e.url}`}
            key={index}
          >
            <Icon
              icon={iconMap[e.type] || "ri:question-fill"}
              width="30"
              className="accent-text rounded-lg"
            />
            <p
              className="text-gray-700 ml-2 overflow-hidden text-ellipsis"
              title={e.url}
            >
              {e.url}{" "}
            </p>
            <Icon icon="ep:arrow-right" width="20" height="20" />
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default CompanySocialMedia;
