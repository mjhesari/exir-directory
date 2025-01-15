import { Icon } from "@iconify-icon/react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import { Business } from "@/types/dataTypes";

const CompanyHoldApp = ({
  exchangeData,
  dicts,
}: {
  exchangeData: Business;
  dicts: DictsTypes;
}) => {
  return (
      <Card className="flex border p-2" shadow="none">
        <CardHeader>
          <h3 className="font-semibold text-lg ">{exchangeData?.name?.[dicts.lang as keyof typeof exchangeData.name]}{dicts.holdingApp}</h3>
        </CardHeader>
        <CardBody className="grid md:grid-cols-4 grid-cols-2  gap-3">
            <Button size="lg">
              <Icon icon="logos:google-play-icon" width="30" /> Google Play
            </Button>
            <Button size="lg" >
              <Icon icon="logos:apple-app-store" width="30" /> App Store
            </Button>
            <Button size="lg">
              <Icon icon="logos:microsoft-icon" width="30" /> Microsoft
            </Button>
        </CardBody>
      </Card>
  );
};

export default CompanyHoldApp;
