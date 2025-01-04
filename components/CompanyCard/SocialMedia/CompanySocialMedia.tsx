import { Icon } from "@iconify/react";
import { Button, Card } from "@nextui-org/react";
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
      <div className="space-y-4" dir="ltr">
        {exchangeData.links?.map((e, index) => (
          <Link
            className="flex items-center justify-between bg-gray-500/10 rounded-xl p-1 "
            href={e.url.includes("//") ? e.url : `https://${e.url}`}
            key={index}
          >
            <div className="p-3 flex flex-row justify-center items-center">
              <Icon
                icon={iconMap[e.type] || "ri:question-fill"}
                width="30"
                className="accent-text rounded-lg"
              />
              <p className="text-base text-gray-700 ml-2">{e.url} </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="lg"
                isIconOnly
                className="bg-transparent"
                endContent={
                  <Icon icon="ep:arrow-right" width="20" height="20" />
                }
              ></Button>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default CompanySocialMedia;
