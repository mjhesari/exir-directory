"use client";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Icon } from "@iconify-icon/react";
import { Button, Card, Divider } from "@nextui-org/react";
import {
  FilterState,
  resetFilters,
} from "@/redux/features/filters/filter-slice";
import { useEffect, useTransition } from "react";
import { getDirectoryData } from "@/utils/api";
import { setExchangeData } from "@/redux/features/data/data-slice";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import CategoryExchange from "@/components/Directory/exchange/FilterBar/Category";
import dynamic from "next/dynamic";
const CategorySelect = dynamic(
  () =>
    import(
      `@/components/Directory/${process?.env?.NEXT_PUBLIC_DIRECTORY}/FilterBar/Category`
    ),
  {
    loading: () => <p>Loading...</p>,
  }
) as typeof CategoryExchange;
const CardFilterDubai = ({ dicts }: { dicts: DictsTypes }) => {
  const dispatch = useAppDispatch();
  const [filterDataLoading, startFiltering] = useTransition();
  const filters = useAppSelector((state) => state.filters.dynamicFilters);
  const { pageIndex, pageSize } = useAppSelector((state) => state.filters);
  const exchangeData = useAppSelector((state) => state.data.data);

  const condition = Object.keys(filters).find((key) => {
    const value = filters[key as keyof typeof filters];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === "string") {
      return value.length > 0;
    }
    return false;
  });

  const handleClearAll = () => {
    dispatch(resetFilters());
    applyFilters({});
  };

  const applyFilters = async ( customFilters?: Partial<FilterState["dynamicFilters"]>) => {
    const activeFilters = customFilters || filters;
    await getDirectoryData(activeFilters, pageSize, pageIndex).then(
      (data) => dispatch(setExchangeData(data.data))
    );
  };

  useEffect(() => {
    if (!exchangeData.length) {
      startFiltering(() => applyFilters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.name]);
  return (
    <Card
      shadow="none"
      className="border bg-white min-w-[300px] h-full lg:h-[calc(100vh-100px)] sticky top-20 p-2 grid grid-rows-[max-content_auto_max-content]"
    >
      <div className="flex items-start justify-between mt-3">
        <div className="w-max">
          <h2 className="text-lg font-semibold flex items-center px-3">
            {" "}
            <Icon
              icon="mage:filter"
              width="24"
              height="24"
              className="mr-1"
            />{" "}
            {dicts?.CardFilter.filter}
          </h2>
        </div>
        {condition || filterDataLoading ? (
          <Button
            onClick={handleClearAll}
            color="secondary"
            variant="light"
            size="sm"
            aria-label={`${dicts?.button.clearAll}`}
            endContent={<Icon icon="lucide:x" width={15} />}
          >
            {dicts?.button.clearAll}
          </Button>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 overflow-auto mb-4 p-3">
        <Divider className="my-0" />
        <CategorySelect dicts={dicts} />
        <div className="flex flex-col gap-3">
          <Divider className="my-0" />
        </div>
      </div>

      <Button
        onClick={() => startFiltering(() => applyFilters())}
        aria-label="apply-filters"
        isDisabled={!condition || filterDataLoading}
        isLoading={filterDataLoading}
      >
        {dicts.button.Apply}
      </Button>
    </Card>
  );
};

export default CardFilterDubai;
