"use client";
import {
  Drawer,
  DrawerContent,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import CardFilterExchange from "@/components/Directory/exchange/FilterBar/CardFilter";
const CardFilter = dynamic(
  () =>
    import(`@/components/Directory/${process.env.NEXT_PUBLIC_DIRECTORY}/FilterBar/CardFilter`),
  {
    loading: () => <p>Loading...</p>,
  }
) as typeof CardFilterExchange;
const MobileFilterBar = ({ dicts }: { dicts: DictsTypes }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
const left=dicts.dir==="rtl"? "left":"right"
  return (
    <div className="lg:hidden">
      <Button
        onPress={onOpen}
        className="bg-white border w-max text-lg ms-3"
        startContent={<Icon icon="mdi:filter" width="24" height="24" />}
      >
        {dicts?.CardFilter?.filter}
      </Button>
      <Drawer
      
      placement={`${left}`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="lg:hidden w-[85%]"
        classNames={{ backdrop: "lg:hidden", closeButton: "z-50 text-xl" }}
      >
        <DrawerContent>
          <CardFilter dicts={dicts} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileFilterBar;
