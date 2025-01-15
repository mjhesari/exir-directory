import { Card } from "@nextui-org/card";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Business } from "@/types/dataTypes";
import { Chip } from "@nextui-org/react";

export function CompanyDetails({
  exchangeData,
  dicts,
}: {
  exchangeData: Business;
  dicts: DictsTypes;
}) {
  return (
    <Card className="p-5 justify-start border" shadow="none">
      <ul className="space-y-2">
        <li className="grid grid-cols-[max-content_auto] gap-1">
          <strong className="font-semibold">
            {dicts.cardDetails.exchangeType} :
          </strong>
          <div className="flex flex-wrap gap-2">
            {exchangeData?.tags?.map((e, index) => (
              <Chip variant="flat" size="sm" radius="sm" key={index}>
                {e?.[dicts?.lang] || e.en || e.fa}
              </Chip>
            ))}
          </div>
        </li>
        <li>
          <strong className="font-semibold">
            {dicts.CardFilter.acceptedPaymentMethods} :
          </strong>

          {(
            (exchangeData?.attributes?.find(
              (e) => e.key === "Accepted Payment Methods"
            )?.value as string[]) || []
          ).map((attr) => (
            <span className="px-1 text-default-500" key={attr}>
              <Chip variant="flat" size="sm" radius="sm" key={attr}>
                {attr}
              </Chip>
            </span>
          ))}
        </li>
        <li>
          <strong className="font-semibold">
            {dicts.CardFilter.fiatDeposite} :
          </strong>{" "}
          {(
            (exchangeData?.attributes?.find((e) => e.key === "Fiat Deposit")
              ?.value as string[]) || []
          )?.map((attr, index) => (
            <span className="p-2 text-default-500" key={index}>
              <Chip variant="flat" size="sm" radius="sm">
                {attr}
              </Chip>
            </span>
          ))}
        </li>
        <li>
          <strong className="font-semibold">
            {dicts.cardDetails.IncorporationCountry} :
          </strong>{" "}
          <span className="p-2 text-default-500">
            {exchangeData?.foundingLocation ?? "No Data"}
          </span>
        </li>
        <li>
          <strong className="font-semibold">
            {dicts.cardDetails.NumberofEmployees} :
          </strong>{" "}
          <span className="p-2 text-default-500">
            {exchangeData?.employeeCount ?? "No Data"}
          </span>
        </li>
        <li>
          <strong className="font-semibold">
            {dicts.cardDetails.Founding} :
          </strong>
          <span className="p-2 text-default-500">
            {exchangeData.foundingDate}
          </span>
        </li>
        <li>
          <strong className="font-semibold">
            {dicts.CardFilter.marginTrading} :
          </strong>
          <span className="p-2 text-default-500">
            {exchangeData.attributes
              ?.find((e) => e.key === "Margin Trading")
              ?.value.toString()
              ? "Yes"
              : "No"}
          </span>
        </li>{" "}
        <li>
          <strong className="font-semibold">
            {dicts.cardDetails.marketWithFees} :
          </strong>
          <span className="p-2 text-default-500">
            {exchangeData.attributes
              ?.find((e) => e.key === "Market With Fees")
              ?.value.toString()
              ? "Yes"
              : "No"}
          </span>
        </li>
      </ul>
    </Card>
  );
}
