import img5 from '@/public/Frame 234.png'
import { Card } from '@nextui-org/react';
import Image from 'next/image'

const AdsCard = () => {
    return (
        <Card
        className="p-8 rounded-lg items-center justify-center border"
        shadow="none"
      >
        <div className="w-full flex gap-5">
            <Image alt="gallary" src={img5} className="w-full"/>
        </div>
      </Card>
    );
}

export default AdsCard;
