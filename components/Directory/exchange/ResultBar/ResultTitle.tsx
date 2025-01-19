import { DictsTypes } from '@/app/[lang]/dictionaries/dictionaries';
import React from 'react';

const ResultTitleExchange = ({ dicts }: { dicts: DictsTypes }) => {
    return (
        <div className="flex flex-col justify-between items-start pt-4">
          <h2 className="text-2xl font-bold p-2 pb-1">
            {dicts?.CardResult?.titleResult.exchanges}
          </h2>
          <h5 className="px-2 p-1 font-normal">
            {dicts?.CardResult?.desc.exchanges}
          </h5>
          {/* <div className="flex flex-row justify-center items-center">
            <span className="text-xs">{dicts?.CardResult?.sortBy}</span>
            <Select
            aria-label="select-by-sort"
              className="w-32 h-fit text-xs"
              defaultSelectedKeys={["relevant"]}
              size="sm"
              classNames={{
                trigger: "bg-transparent shadow-none",
              }}
            >
              <SelectItem key="relevant" value="relevant">
                {dicts?.CardResult?.selector?.relevant}
              </SelectItem>
              <SelectItem key="newest" value="newest">
                {dicts?.CardResult?.selector?.newest}
              </SelectItem>
              <SelectItem key="oldest" value="oldest">
                {dicts?.CardResult?.selector?.oldest}
              </SelectItem>
            </Select>
          </div> */}
        </div>
    );
}

export default ResultTitleExchange;
