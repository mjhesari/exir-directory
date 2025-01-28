import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setSelectedCities } from "@/redux/features/filters/filter-slice";
import { CityType } from "@/types/dataTypes";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

const CitySelect = ({ dicts }: { dicts: DictsTypes }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { city, region } = useAppSelector(
      (state) => state.filters.dynamicFilters
      );
  const [cityData, setCityData] = useState<CityType[]>([]);
  useEffect(() => {
    const fetchcities = async () => {
        if (!region) {
          setCityData([]);
            dispatch(setSelectedCities(""));
            setLoading(true);
            return;
          }
      try {
        const response = await fetch(
            `https://country.liara.run/api/city/province/${region}`
            );
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        const data = await response.json();
        setCityData(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchcities();
  }, [region,dispatch]);

  return (
    <div className="flex flex-col gap-3 mb-2">
      <h3 className="font-semibold">{dicts?.CardFilter?.city}</h3>
      <div>
        <Autocomplete
          aria-label="province-selector"
          placeholder={
            loading
              ? "درحال بارگیری شهر ها..."
              : `${dicts?.placeholder?.cityChoose}`
          }
          fullWidth
          defaultItems={cityData}
          onSelectionChange={(cityData) =>
            dispatch(setSelectedCities(cityData?.toString() ?? ""))
          }
          isDisabled={loading}
          defaultInputValue={city}
        >
          {(cityName) => (
            <AutocompleteItem
              className="font-light"
              key={cityName?.tr?.fa}
              value={cityName?.tr?.fa}
              textValue={cityName?.tr?.[dicts.lang]}
            >
              {cityName?.tr?.[dicts.lang]}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </div>
  );
};

export default CitySelect;
