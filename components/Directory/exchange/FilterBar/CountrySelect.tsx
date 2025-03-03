import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem} from "@heroui/react";
// import Types
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setSelectedCountries } from "@/redux/features/filters/filter-slice";
import { CountryType } from "@/types/dataTypes";

const CountrySelect = ({ dicts }: { dicts: DictsTypes }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { country } = useAppSelector((state) => state.filters.dynamicFilters);
  const [countryData, setCountryData] = useState<CountryType[]>([]);
  //* Fetch Data Countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://country.liara.run/api/country");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="flex flex-col gap-3 mb-2">
      <h3 className="font-semibold">{dicts?.CardFilter?.country}</h3>
      <div>
        <Autocomplete
          aria-label="country-selector"
          placeholder={
            loading
              ? "Loading countries..."
              : `${dicts?.placeholder?.countryChoose}`
          }
          fullWidth
          defaultItems={countryData}
          onSelectionChange={(country) =>
            dispatch(setSelectedCountries(country?.toString() ?? ""))
          }
          isDisabled={loading}
          inputValue={country}
        >
          {(countryName) => (
            <AutocompleteItem
            className="font-light"
              key={countryName?.tr?.en}
              textValue={countryName?.tr?.[dicts.lang]}
            >
              {countryName?.tr?.[dicts.lang]}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </div>
  );
};

export default CountrySelect;
