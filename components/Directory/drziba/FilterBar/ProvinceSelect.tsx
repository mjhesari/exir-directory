import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setSelectedProvinces } from "@/redux/features/filters/filter-slice";
import { ProvinceType } from "@/types/dataTypes";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useEffect, useState } from "react";

const ProvinceSelect = ({ dicts }: { dicts: DictsTypes }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { region } = useAppSelector((state) => state.filters.dynamicFilters);
  const [province, setProvince] = useState<ProvinceType[]>([]);
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://country.liara.run/api/province");
        if (!response.ok) {
          throw new Error("Failed to fetch Provinces");
        }
        const data = await response.json();
        setProvince(data);
      } catch (error) {
        console.error("Error fetching Provinces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, [region]);

  return (
    <div className="flex flex-col gap-3 mb-2">
      <h3 className="font-semibold">{dicts?.CardFilter?.province}</h3>
      <div>
        <Autocomplete
          aria-label="province-selector"
          placeholder={
            loading
              ? "درحال بارگیری استان ها..."
              : `${dicts?.placeholder?.provinceChoose}`
          }
          fullWidth
          defaultItems={province}
          onSelectionChange={(province) =>
            dispatch(setSelectedProvinces(province?.toString() ?? ""))
          }
          isDisabled={loading}
          defaultInputValue={region}
        >
          {(provinceName) => (
            <AutocompleteItem
              className="font-light"
              key={provinceName?.id}
              value={provinceName?.id}
              textValue={provinceName?.tr?.[dicts.lang]}
            >
              {provinceName?.tr?.[dicts.lang]}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </div>
  );
};

export default ProvinceSelect;
