import { Icon } from "@iconify/react";
import { Card } from "@heroui/react";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Business } from "@/types/dataTypes";
import Link from "next/link";
import { colorByType, iconMap } from "@/utils/data/data";

const CompanySocialMedia = ({
  exchangeData,
  dicts,
}: {
  exchangeData: Business;
  dicts: DictsTypes;
}) => {
  const channelPlatforms = exchangeData?.links?.filter(
    (link) => !link?.type?.includes('-chat') && !link?.type?.includes('maps')
  );
  const getTitle = (type: string) => {
    const translation = dicts?.button?.type;
    return translation?.[type as keyof typeof translation] || type;
  };
  return (
    <Card className="flex border p-4" shadow="none">
      <h3 className="font-semibold text-lg px-1 mb-3">{dicts.socialNetwork}</h3>
      <div className="gap-3 grid grid-cols-2 lg:grid-cols-4">
        {channelPlatforms?.map((e, index) => (
          <Link
            className={`${colorByType?.[e.type]} text-white p-3 rounded-lg text-center flex flex-row justify-center items-center relative`}
            href={e.url.includes("//") ? e.url : `https://${e.url}`}
            key={index}
          >
            <Icon
              icon={iconMap[e.type] || "ri:question-fill"}
              width="30"
              className="rounded-lg"
            />
<span> {getTitle(e?.type ??"")}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default CompanySocialMedia;
