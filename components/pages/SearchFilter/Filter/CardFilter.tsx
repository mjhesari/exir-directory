"use client";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Icon } from "@iconify-icon/react";
import { Button, Card, Divider } from "@nextui-org/react";
import CountrySelect from "../SelectBox/ExchangeSelect/CountrySelect";
import FiatSelect from "../SelectBox/ExchangeSelect/FiatSelect";
import PaymentSelect from "../SelectBox/ExchangeSelect/PaymentSelect";
import CategorySelect from "../SelectBox/CategorySelect";
import MarketSwitch from "../SelectBox/ExchangeSelect/MarketSwitch";
import MarginSwitch from "../SelectBox/ExchangeSelect/MarginSwitch";
import { resetFilters } from "@/redux/features/filters/filter-slice";
import { useCallback, useEffect, useTransition } from "react";
import { getExchangeData } from "@/utils/api";
import { setExchangeData } from "@/redux/features/data/data-slice";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import ProvinceSelect from "../SelectBox/DrZibaSelect/ProvinceSelect";
import CitySelect from "../SelectBox/DrZibaSelect/CitySelect";

const CardFilter = ({ dicts }: { dicts: DictsTypes }) => {
  const dispatch = useAppDispatch();
  const [filterDataLoading, startFiltering] = useTransition();
  const filters = useAppSelector((state) => state.filters);
  // const exchangeData = useSelector((state: RootState) => state.data.data);


  const handleClearAll = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const applyFilters = async () => {
    await getExchangeData(0, 24, filters).then((data) => dispatch(setExchangeData(data.data))
    );
  };

  useEffect(() => {
    const condition = Object.keys(filters).find(
      (key) => filters[key as keyof typeof filters].length
    );

    if (!condition) {
      startFiltering(() => applyFilters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.selectedCategories,
    filters.selectedCountries,
    filters.selectedCurrencies,
    filters.selectedPayments,
    filters.switchIsSelectedMargin,
    filters.switchIsSelectedMarket,
    filters.selectedCities,
    filters.selectedProvinces,
  ]);
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.searchName]);
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
        {Object.keys(filters).find(
          (key) => filters[key as keyof typeof filters].length
        ) || filterDataLoading ? (
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
        <Divider className="my-0" />
        {process?.env?.NEXT_PUBLIC_DIRECTORY === "drziba" ? (
          <div className="flex flex-col gap-3">
            <ProvinceSelect dicts={dicts} />
            <Divider className="my-0" />
            <CitySelect dicts={dicts}/>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <PaymentSelect dicts={dicts} />
            <Divider className="my-0" />
            <FiatSelect dicts={dicts} />
            <Divider className="my-0" />
            <CountrySelect dicts={dicts} />
            <Divider className="my-0" />
            <MarginSwitch dicts={dicts} />
            <Divider className="my-0" />
            <MarketSwitch dicts={dicts} />
          </div>
        )}
      </div>

      <Button
        onClick={() => startFiltering(() => applyFilters())}
        aria-label="apply-filters"
        isDisabled={
          !Object.keys(filters).find(
            (key) => filters[key as keyof typeof filters].length
          ) || filterDataLoading
        }
        isLoading={filterDataLoading}
      >
        Apply Filter
      </Button>
    </Card>
  );
};

export default CardFilter;
