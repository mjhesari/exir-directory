import { Switch } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { RootState } from "@/redux/app/store";
import { toggleSelectedMargin } from "@/redux/features/filters/filter-slice";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
const MarginSwitch = ({
  dicts,
}: {dicts:DictsTypes}) => {
  const {switchIsSelectedMargin} = useAppSelector((state: RootState) => state.filters);
  const dispatch=useAppDispatch()
  return (
    <div className="flex flex-row justify-between items-center place-items-center gap-3">
      <h3 className="font-semibold">{dicts?.CardFilter?.marginTrading}</h3>
      <Switch
        size="sm"
        aria-label="margin-switch"
        color="secondary"
        onValueChange={(isSelected)=>dispatch(toggleSelectedMargin(isSelected))}
        isSelected={switchIsSelectedMargin?true:false}
      />
    </div>
  );
};

export default MarginSwitch;
