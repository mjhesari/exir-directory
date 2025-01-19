import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { Switch } from "@nextui-org/react";
import { toggleSelectedMarket } from "@/redux/features/filters/filter-slice";

const MarketSwitch = ({dicts}:{dicts:DictsTypes}) => {
  const dispatch=useAppDispatch()
  const {switchIsSelectedMarket}=useAppSelector((state) => state.filters)
    return (
        <div className="flex flex-row justify-between items-center place-items-center gap-3">
              <h3 className="font-semibold">{dicts?.CardFilter?.marketWithNoFees}</h3>
              <Switch
                size="sm"
                aria-label="market-switch"
                color="secondary"
                onValueChange={(isSelected)=>dispatch(toggleSelectedMarket(isSelected))}
                isSelected={switchIsSelectedMarket?true:false}
              />
            </div>
    );
}

export default MarketSwitch;
