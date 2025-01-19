import { Icon } from "@iconify/react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";

const CompanyCuntributes = ({ dicts }: { dicts?: DictsTypes }) => {
  return (
    <div>
      <Card className="rounded-lg border flex flex-col p-4" shadow="none">
        <CardHeader className="flex flex-col justify-start items-start">
          <h3 className="text-lg font-semibold items-center">{dicts?.contributors?.contributors}</h3>
        </CardHeader>
        <CardBody className="flex-col flex items-start gap-3">
        <p className="font-semibold text-default-400 text-small space-y-4">
            this is the actual description the user has written
          </p>
          <AvatarGroup isBordered max={5} total={10}>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          </AvatarGroup>
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-3">
          <div className="gap-3 flex flex-row justify-between place-content-start">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">+120</p>
              <p className=" text-default-400 text-small">{dicts?.contributors?.contributors}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">+1200</p>
              <p className="text-default-400 text-small">{dicts?.contributors?.avardingToken}</p>
            </div>
          </div>
          <div>
            <Button dir="ltr"
              className="bg-transparent text-indigo-500 ml-0 p-0"
              endContent={<Icon icon="ep:arrow-right" width="20" height="20" />}
            >
              {dicts?.button?.seeallcontribute}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyCuntributes;
