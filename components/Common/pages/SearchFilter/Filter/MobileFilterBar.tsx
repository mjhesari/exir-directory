"use client";
import {
  Drawer,
  DrawerContent,
  Button,
  useDisclosure,
} from "@heroui/react";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import CardFilterExchange from "@/components/Directory/exchange/FilterBar/CardFilter";
const CardFilter = dynamic(
  () =>
    import(
      `@/components/Directory/${process.env.NEXT_PUBLIC_DIRECTORY}/FilterBar/CardFilter`
    ),
  {
    loading: () => <p>Loading...</p>,
  }
) as typeof CardFilterExchange;
const MobileFilterBar = ({ dicts }: { dicts: DictsTypes }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const left = dicts.dir === "rtl" ? "left" : "right";
  return (
    <div className="lg:hidden fixed bottom-2 z-50">
      <Button
        onPress={onOpen}
        radius="full"
        isIconOnly
        size="lg"
        className="w-max ms-3 bg-black text-white px-4 py-8"
        startContent={<Icon icon="icon-park-outline:search" width={30}  />}
      >
        {/* {dicts?.CardFilter?.filter} */}
      </Button>
      <Drawer
        hideCloseButton
        placement={`${left}`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="lg:hidden w-[80%]"
        classNames={{ backdrop: "lg:hidden", closeButton: "z-50 text-xl" }}
      >
        <DrawerContent>
          <CardFilter dicts={dicts} onClose={() => onOpenChange()} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileFilterBar;
