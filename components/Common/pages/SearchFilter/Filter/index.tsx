import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import DesktopFilterBar from "./DesktopFilterBar";
import MobileFilterBar from "./MobileFilterBar";

const FilterBar = ({ dicts }: { dicts: DictsTypes }) => {
    
  return (
    <>
      <DesktopFilterBar dicts={dicts} />
      <MobileFilterBar dicts={dicts} />
    </>
  );
};

export default FilterBar;
