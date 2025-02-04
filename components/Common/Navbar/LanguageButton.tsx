"use client";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Icon } from "@iconify-icon/react";
import {
  Drawer,
  DrawerContent,
  Button,
  useDisclosure,
  Divider,
  Input,
} from "@nextui-org/react";
import LanguageCard from "../pages/languages/LanguageCard";
import { LanguagesTypes } from "@/types/dataTypes";
import { useState, useEffect } from "react";
import useMediaQuery from "@/hooks/use-media-query";

const LanguageButton = ({
  dicts,
  lang,
}: {
  dicts: DictsTypes;
  lang: LanguagesTypes;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isMoblie = useMediaQuery("(max-width: 1024px)");
  const placement = dicts.dir === "rtl" ? "left" : "right";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      setSelectedLanguage(pathSegments[0]);
    }
  }, []);

  return (
    <>
      {isMoblie ? (
        <div className="fixed top-[10px] end-0 h-max z-70">
          <div className=" mx-auto px-3">
            <div className="flex items-center">
              <Button
                onPress={onOpen}
                variant="bordered"
                size="sm"
                className={`bg-white flex flex-row p-[26px] items-center rounded-full border`}
                aria-label="language page"
                isIconOnly
                startContent={<Icon icon="mdi:translate" width={32} />}
                >
                 <p className="text-lg">
                  </p> 
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onPress={onOpen}
          variant="bordered"
          size="sm"
          className={`text-default-500 rounded-xl hover:text-secondary-600 hover:border-secondary-600 lg:flex hidden`}
          aria-label="language page"
          startContent={<Icon icon="mdi:translate" width={20} />}
          >
          Languages
        </Button>
      )}
      <Drawer
        placement={isMoblie ? "bottom" : placement}
        size={isMoblie ? "3xl" : "sm"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{ closeButton: "z-50 text-xl" }}
      >
        <DrawerContent>
          <main className="px-4">
            <section className="mx-auto flex flex-row justify-center items-center mt-4 mb-2">
              <h2 className="text-xl font-semibold text-default-600">
                Choose your language
              </h2>
            </section>
            <Input
              type="text"
              placeholder="Search languages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2"
              classNames={{ base: "!px-0" }}
              radius="none"
            />
            <Divider className="w-full" />
            <LanguageCard
              language={lang}
              selectedLanguage={selectedLanguage}
              searchQuery={searchQuery}
            />
          </main>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LanguageButton;
