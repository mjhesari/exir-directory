"use client"
import { Icon } from "@iconify/react";
import { Input } from "@heroui/react";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setSearchName } from "@/redux/features/filters/filter-slice";
import { useEffect, useState } from 'react';


const SearchInputMobile = ({ dicts }: { dicts?: DictsTypes }) => {
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
    setInputValue(filters?.dynamicFilters.name?.[dicts?.lang as keyof typeof filters.dynamicFilters.name]??'')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.dynamicFilters.name]);

  return (
    <div className="p-1 w-full h-14 flex justify-center flex-col lg:hidden mt-2">
    <Input
    classNames={{
      input: " font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      inputWrapper: 'min-h-full border-1 border-default-400',
      base:"min-h-full ",
    }}
    radius="md"
    placeholder={dicts?.placeholder?.search}
    startContent={<Icon icon="solar:magnifer-line-duotone" width={18}/>}
    type="search"
    onKeyDown={handleKeyDown}
    onChange={handleChange}
    value={inputValue}
    />
    </div>
  );
};

export default SearchInputMobile;
