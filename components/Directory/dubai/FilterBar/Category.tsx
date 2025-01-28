"use client";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { categoryDubai} from "@/utils/data/data";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setSelectedCategories } from "@/redux/features/filters/filter-slice";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
const CategoryDubai = ({ dicts }: { dicts: DictsTypes }) => {
  const { tags } = useAppSelector((state) => state.filters.dynamicFilters);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold">
        {dicts?.CardFilter?.category?.dubaiCategory.category}
      </h3>
      <div className="flex flex-col gap-5">

          <CheckboxGroup
            value={tags}
            onChange={(values) => dispatch(setSelectedCategories(values))}
            aria-label="category-exchange"
            color="secondary"
          >
            {categoryDubai.map((cate) => (
              <Checkbox value={cate.id} key={cate.id} className="font-light">
                {cate.value}
              </Checkbox>
            ))}
          </CheckboxGroup>
      </div>
    </div>
  );
};

export default CategoryDubai;
