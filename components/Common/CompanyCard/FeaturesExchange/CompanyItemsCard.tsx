import { Card } from "@nextui-org/card";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Business } from "@/types/dataTypes";

const CompanyItemsCard = ({
  exchangeData,
  dicts,
}: {
  exchangeData: Business
  dicts: DictsTypes;
}) => {
  return (
    <div className="p-5 rounded-lg items-center justify-start border bg-white">
    <Card
      className=" flex items-center justify-center"
      shadow="none"
    >
      <article className="w-full flex gap-5">
        <div className="ml-2">
          <h3 className="text-xl font-semibold mb-5">{exchangeData?.name?.[dicts?.lang as keyof typeof exchangeData.name]||"No Data"}</h3>
          <ul className="text-md text-slate-600/95 space-y-5">
            <li>{exchangeData?.description?.[dicts.lang as keyof typeof exchangeData.description]??"No Description"}</li>
          </ul>
        </div>
      </article>
    </Card>
    </div>
  );
};

export default CompanyItemsCard;
