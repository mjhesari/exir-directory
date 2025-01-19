import { Chip, Select, SelectItem } from "@nextui-org/react";
// import Data
import { fiatDespoit } from "@/utils/data/data";
// import Types
import { setSelectedCurrencies } from "@/redux/features/filters/filter-slice";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";

const FiatSelect = ({ dicts }: { dicts: DictsTypes }) => {
  const dispatch = useAppDispatch();
  const { selectedCurrencies } = useAppSelector((state) => state.filters);
  // Dispatch function for updating currencies
  const handleCurrencyChange = useCallback(
    (value: Set<string>) => {
      dispatch(setSelectedCurrencies(Array.from(value)));
    },
    [dispatch]
  );
  // Dispatch function for removing a currency
  const handleRemoveCurrency = (currency: string) => {
    const updatedCurrencies = selectedCurrencies.filter(
      (selectedCurrency) => selectedCurrency !== currency
    );
    dispatch(setSelectedCurrencies(updatedCurrencies));
  };
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold">{dicts?.CardFilter?.fiatDeposite}</h3>

      <div>
        <Select
          aria-label="fiat-selector"
          placeholder={`${dicts?.placeholder?.currencyChoose}`}
          selectionMode="multiple"
          selectedKeys={new Set(selectedCurrencies)}
          onSelectionChange={(keys) =>
            handleCurrencyChange(keys as Set<string>)
          }
          content="none"
        >
          {fiatDespoit.map((fiat) => (
            <SelectItem key={fiat.key} value={fiat.key}>
              {fiat.label}
            </SelectItem>
          ))}
        </Select>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCurrencies.map((currency) => (
            <Chip
              className=" text-wrap h-full py-1"
              key={currency}
              variant="bordered"
              onClose={() => handleRemoveCurrency(currency)}
            >
              {currency}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiatSelect;
