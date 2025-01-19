"use client"
import { Icon } from "@iconify/react";
import { Input } from "@nextui-org/react";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setSearchName } from "@/redux/features/filters/filter-slice";
import { useEffect, useState } from "react";


const SearchInput = ({ dicts }: { dicts?: DictsTypes }) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const filters = useAppSelector((state) => state.filters);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const trimmedValue = inputValue.trim();
      if (trimmedValue) {
        dispatch(setSearchName({ [dicts?.lang??'en']: trimmedValue }));
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      dispatch(setSearchName({ [dicts?.lang??'en']: ""}));
    }
  };

  useEffect(() => {
    setInputValue(filters?.searchName?.[dicts?.lang as keyof typeof filters.searchName]??'')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.searchName]);

  return (
    <Input
    classNames={{
      input: " font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 ",
      innerWrapper: "bg-transparent ",
      base:'max-xl:w-[15rem]',
      mainWrapper:'max-xl:w-[15rem] w-[25rem]'
    }}
    radius="full"
    placeholder={dicts?.placeholder?.search}
    startContent={<Icon icon="solar:magnifer-line-duotone" />}
    type="search"
    onKeyDown={handleKeyDown}
    onChange={handleChange}
    value={inputValue}
  />
  );
};

export default SearchInput;
