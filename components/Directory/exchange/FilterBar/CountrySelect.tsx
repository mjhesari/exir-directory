import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem} from "@nextui-org/react";
// import Types
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setSelectedCountries } from "@/redux/features/filters/filter-slice";
import { CountryType } from "@/types/dataTypes";

const CountrySelect = ({ dicts }: { dicts: DictsTypes }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedCountries } = useAppSelector((state) => state.filters);
  const [country, setCountry] = useState<CountryType[]>([]);
  //* Fetch Data Countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://country.liara.run/api/country");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountry(data);
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
          defaultItems={country}
          onSelectionChange={(country) =>
            dispatch(setSelectedCountries(country?.toString() ?? ""))
          }
          isDisabled={loading}
          defaultInputValue={selectedCountries}
        >
          {(countryName) => (
            <AutocompleteItem
            className="font-light"
              key={countryName?.tr?.en}
              value={countryName?.tr?.en}
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
