"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Icon } from "@iconify/react";
import StaticMap from "./static-map.jsx";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Business } from "@/types/dataTypes";

export function CompanyLocCard({
  exchangeData,
  dicts,
}: {
  exchangeData: Business;
  dicts: DictsTypes;
}) {
  return (
    <>
      {exchangeData?.geo ? (
        <Card className="w-full bg-white border p-1" shadow="none">
          <CardBody>
            <div className="relative h-60 w-full bg-gray-100 overflow-hidden rounded-lg">
              {/* Replace with actual map implementation */}
              <StaticMap position={exchangeData?.geo} />
            </div>
            <div className="flex justify-between items-start flex-col">
              <div className="flex items-center justify-center gap-x-2 mt-3">
                <Icon
                  icon="carbon:location"
                  className="h-6 w-6 text-gray-500"
                />
                <span className="text-medium text-gray-600">
                  {exchangeData.address}
                </span>
              </div>
              <div className="items-start bg-transparent mt-2 px-0" dir="ltr">
                <Button
                  aria-label="navigate"
                  size="md"
                  className="text-indigo-500 bg-transparent flex flex-row"
                  endContent={
                    <Icon icon="ep:arrow-right" width="20" height="20" />
                  }
                >
                  {dicts?.button.navigate}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ):null}
    </>
  );
}
