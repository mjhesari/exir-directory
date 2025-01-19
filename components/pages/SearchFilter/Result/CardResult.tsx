"use client";
import { Button, Card, Skeleton, Spinner } from "@nextui-org/react";
import { ExchangeCard } from "./ExchangeCard";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { useEffect, useState } from "react";
import { setExchangeData } from "@/redux/features/data/data-slice";
import { getExchangeData } from "@/utils/api";
import Link from "next/link";
import { Business } from "@/types/dataTypes";
import { setPageIndex } from "@/redux/features/filters/filter-slice";

const CardResult = ({ dicts }: { dicts: DictsTypes }) => {
  const exchangeData = useAppSelector((state) => state.data.data);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const filters = useAppSelector((state) => state.filters);
  const {pageIndex,pageSize}=useAppSelector(state=>state.filters)

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await getExchangeData(filters,pageSize,pageIndex);
        if (Array.isArray(res.data)) {
          const newData = res.data.filter(
            (item: Business) => !exchangeData.some((existingItem) => existingItem.id === item.id)
          );
          
          if (newData.length > 0) {
            dispatch(setExchangeData([...(exchangeData || []), ...newData]));
          }
        } else {
          console.error("Unexpected data format:", res.data);
        }
      } catch (error) {
        console.error("Error while fetching exchange data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!loading && pageIndex > 0) {
      getData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, filters,dispatch]);

  return (
    <Card
      className="flex flex-col px-4 border w-full min-w-[300px] lg:!me-4"
      shadow="none"
    >
      <div className="flex flex-col">
        <div className="flex flex-col justify-between items-start pt-4">
          <h2 className="text-2xl font-bold p-2 pb-1">
            {process?.env?.NEXT_PUBLIC_DIRECTORY === "drziba"
              ? dicts.CardResult.titleResult.drziba
              : dicts?.CardResult?.titleResult.exchanges}
          </h2>
          <h5 className="px-2 p-1 font-normal">
            {process?.env?.NEXT_PUBLIC_DIRECTORY === "drziba"
              ? dicts.CardResult.desc.drziba
              : dicts?.CardResult?.desc.exchanges}
          </h5>
          {/* <div className="flex flex-row justify-center items-center">
            <span className="text-xs">{dicts?.CardResult?.sortBy}</span>
            <Select
            aria-label="select-by-sort"
              className="w-32 h-fit text-xs"
              defaultSelectedKeys={["relevant"]}
              size="sm"
              classNames={{
                trigger: "bg-transparent shadow-none",
              }}
            >
              <SelectItem key="relevant" value="relevant">
                {dicts?.CardResult?.selector?.relevant}
              </SelectItem>
              <SelectItem key="newest" value="newest">
                {dicts?.CardResult?.selector?.newest}
              </SelectItem>
              <SelectItem key="oldest" value="oldest">
                {dicts?.CardResult?.selector?.oldest}
              </SelectItem>
            </Select>
          </div> */}
        </div>
        <div>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 py-3 md:gap-3 gap-y-4 lg:gap-3 sm:gap-x-3 px-0">
            {exchangeData?.length > 0 ? (
              exchangeData.map((exchange: Business, index) => (                <Link
                  href={`${dicts.lang}/${exchange?.slug}/${exchange?.publicId}`}
                  key={exchange?.id || index}
                  className="border rounded-lg shadow"
                >
                  <ExchangeCard
                    key={exchange?.id || index}
                    dicts={dicts}
                    image={exchange?.image ?? ""}
                    title={exchange?.name}
                  />
                </Link>
              ))
            ) : (
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 py-3 md:gap-3 gap-y-4 lg:gap-3 sm:gap-x-3 px-0 col-span-full">
                {Array.from({ length: exchangeData?.length || 20 }).map(
                  (_, index) => (
                    <Card
                      className="h-48"
                      key={`skeleton-${index}`}
                    >
                      <Skeleton className="rounded-lg flex-col items-start p-0 rounded-b-none object-cover w-full">
                        <div className="h-40 rounded-lg bg-default-300" />
                      </Skeleton>
                      <div className="pt-2 pb-5">
                        <Skeleton className="w-3/5 rounded-lg mx-3">
                          <div className="h-5 w-3/5 rounded-lg bg-default-200 " />
                        </Skeleton>
                      </div>
                    </Card>
                  )
                )}
              </div>
            )}
          </div>
        </div>
        {exchangeData?.length >= 25 && (
          <Button
            className="w-max mx-auto my-4 font-normal"
            radius="lg"
            variant="bordered"
            startContent={loading ? <Spinner size="sm" color="default" /> : ""}
            onPress={() => dispatch(setPageIndex(pageIndex + 1))}
            disabled={loading}
            aria-label="load-more"
          >
            Load more...
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CardResult;
