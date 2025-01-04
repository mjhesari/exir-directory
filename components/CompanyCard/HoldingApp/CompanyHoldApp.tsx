import { Icon } from "@iconify/react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";

const CompanyHoldApp = ({ dicts }: { dicts: DictsTypes }) => {
  return (
      <Card className="flex border p-2" shadow="none">
        <CardHeader>
          <h3 className="font-semibold text-lg">{dicts.holdingApp}</h3>
        </CardHeader>
        <CardBody className="flex-row justify-between">
          <div>
            <Button size="lg">
              <Icon icon="logos:google-play-icon" width="30" />
            </Button>
          </div>
          <Divider orientation="vertical" className="h-5" />
          <div>
            <Button size="lg" >
              <Icon icon="logos:apple-app-store" width="30" />
            </Button>
          </div>
          <Divider orientation="vertical" className="h-5" />
          <div>
            <Button size="lg" >
              <Icon icon="logos:chrome" width="30" />
            </Button>
          </div>
          <Divider orientation="vertical" className="h-5" />
          <div>
            <Button size="lg">
              <Icon icon="logos:microsoft-icon" width="30" />
            </Button>
          </div>
        </CardBody>
      </Card>
  );
};

export default CompanyHoldApp;
