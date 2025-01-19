"use client";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { categoryExchange,categoryZiba } from "@/utils/data/data";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setSelectedCategories } from "@/redux/features/filters/filter-slice";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
const CategorySelect = ({ dicts }: { dicts: DictsTypes }) => {
  const { selectedCategories } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold">
        {process?.env?.NEXT_PUBLIC_DIRECTORY === "drziba"
          ? dicts?.CardFilter?.category?.drzibaCategory.category
          : dicts?.CardFilter?.category?.exchangeCategory?.category}
      </h3>
      <div className="flex flex-col gap-5">
        {process?.env?.NEXT_PUBLIC_DIRECTORY === "drziba" ? (
          <CheckboxGroup
            value={selectedCategories}
            onChange={(values) => dispatch(setSelectedCategories(values))}
            aria-label="category-exchange"
            color="secondary"
          >
            {categoryZiba.map((cate) => (
              <Checkbox value={cate.id} key={cate.id} className="font-light">
                {cate.value}
              </Checkbox>
            ))}
          </CheckboxGroup>
        ) : (
          <CheckboxGroup
            value={selectedCategories}
            onChange={(values) => dispatch(setSelectedCategories(values))}
            aria-label="category-exchange"
            color="secondary"
          >
            {categoryExchange.map((cate) => (
              <Checkbox value={cate.id} key={cate.id} className="font-light">
                {cate.value}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      </div>
    </div>
  );
};

export default CategorySelect;
