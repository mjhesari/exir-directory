"use client";

// Public imports

//* Import components
import { Icon } from "@iconify-icon/react";
import { Dispatch, SetStateAction } from "react";

//* Import types
type RateBoxTypes = {
  value: number;
  onChange?: Dispatch<SetStateAction<number>>;
};

const RateButtons = ({ value, onChange }: RateBoxTypes) => {
  // Data
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center w-max gap-2">
      {stars.map((star) => (
        <Icon 
            key={star} 
            icon="pepicons-pop:star-filled"
            className={star <= value ? 'text-warning transition-all' : undefined}
            onClick={onChange ? () => onChange(star) : undefined}
            height={25}
        />
      ))}
    </div>
  );
};

export default RateButtons;
