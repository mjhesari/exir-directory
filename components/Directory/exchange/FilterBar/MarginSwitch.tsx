import { Switch } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { marginKey, toggleSelectedMargin } from "@/redux/features/filters/filter-slice";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
const MarginSwitch = ({
  dicts,
}: {dicts:DictsTypes}) => {

  const attributes=useAppSelector((state) => state.filters.dynamicFilters.attributes)
  const switchIsSelectedMargin =attributes.find(attr=>attr.key === marginKey)?.value||[]
  const dispatch=useAppDispatch()
  return (
    <div className="flex flex-row justify-between items-center place-items-center gap-3">
      <h3 className="font-semibold">{dicts?.CardFilter?.marginTrading}</h3>
      <Switch
        size="sm"
        aria-label="margin-switch"
        color="secondary"
        onValueChange={(isSelected)=>dispatch(toggleSelectedMargin(isSelected))}
        isSelected={switchIsSelectedMargin==="true"}
      />
    </div>
  );
};

export default MarginSwitch;
