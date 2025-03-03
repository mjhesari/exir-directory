"use client"
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";
import StaticMap from "./static-map.jsx";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Business } from "@/types/dataTypes";
import Link from "next/link"

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
              <div className="items-start mt-2 w-full" dir="ltr">
                <Button
                  aria-label="navigate"
                  size="md"
                  variant="shadow"
                  className="text-indigo-500  flex w-full flex-row"
                  endContent={
                    <Icon icon="ep:arrow-right" width="20" height="20" />
                  }
                >
                  {dicts?.button.navigate}
                  <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${String(exchangeData?.geo)}`}
                  className='absolute inset-0' 
                />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ):null}
    </>
  );
}
