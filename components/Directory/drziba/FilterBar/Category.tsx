"use client";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { categoryZiba } from "@/utils/data/data";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setSelectedCategories } from "@/redux/features/filters/filter-slice";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
const CategoryDrziba = ({ dicts }: { dicts: DictsTypes }) => {
  const { selectedCategories } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold">
        {dicts?.CardFilter?.category?.drzibaCategory.category}
      </h3>
      <div className="flex flex-col gap-5">
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
      </div>
    </div>
  );
};

export default CategoryDrziba;
