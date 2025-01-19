'use client';

// Public imports
import { useState } from 'react';

//* Import components
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { Icon } from '@iconify-icon/react';

//* Import services

const Copier = ({ value }: { value: string }) => {
  /* -------------------------------- Hooks -------------------------------- */
  const [isCopied, setIsCopied] = useState(false);

  /* ------------------------------- Function ------------------------------ */
  // Copying the value
  const copyValue = () => {
    window.navigator.clipboard?.writeText(value).catch(() => null);
    setIsCopied(true);
    toast.success('کپی شد');

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Button
      isIconOnly
      onClick={copyValue}
      size='sm'
      radius='full'
      className='bg-transparent border-indigo-500 border'    >
      <Icon icon="solar:copy-linear" className='transition-all text-indigo-500' width={isCopied ? 0 : 20}  height={20}/>
      <Icon icon="line-md:circle-twotone-to-confirm-circle-transition"
        className='transition-all text-indigo-500'
        width={isCopied ? 25 : 0}
        height={25}
      />
    </Button>
  );
};

export default Copier;
