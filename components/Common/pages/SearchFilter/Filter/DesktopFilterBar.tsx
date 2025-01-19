import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import CardFilterExchange from "@/components/Directory/exchange/FilterBar/CardFilter";
import dynamic from "next/dynamic";
const CardFilter = dynamic(
    () =>
      import(
        `@/components/Directory/${process.env.NEXT_PUBLIC_DIRECTORY}/FilterBar/CardFilter`
      ),
    {
      loading: () => <p>Loading...</p>,
    }
  ) as typeof CardFilterExchange;
const DesktopFilterBar = ({ dicts }: { dicts: DictsTypes }) => {
    return (
        <div className="hidden lg:block">
            <CardFilter dicts={dicts}/>
        </div>
    );
}

export default DesktopFilterBar;
