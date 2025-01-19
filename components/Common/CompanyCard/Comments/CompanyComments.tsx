'use client';
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  User,
} from "@nextui-org/react";
import RateButtons from "../../Rate/rate-buttons";
import { useState } from "react";

const CompanyComments = () => {
  const [rateValue, setRateValue] = useState(3);

  return (
    <div className="flex justify-center flex-col border rounded-lg bg-white p-5">
      <h3 className="font-semibold text-lg ml-2 p-5">Your Voice Matters</h3>
      <Card
        className="flex flex-col border border-indigo-400 mx-8 p-4"
        shadow="none"
      >
        <CardHeader>
          <User
            name="Jane Doe"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
          />
        </CardHeader>
        <CardBody>
          <p>
            I just tried this recipe and it was amazing! The instructions were
            clear and easy to follow, and the end result was delicious. I will
            definitely be making this again. Thanks for sharing!
          </p>
          <Divider className="mt-5 mb-3" />
          <div className="flex flex-row justify-between">
            <div className="flex gap-3">
              <Button
                className=" rounded-full bg-transparent border"
                isIconOnly
              >
                {" "}
                <Icon icon="fluent:emoji-sparkle-48-regular" width="30" />
              </Button>
              <RateButtons value={rateValue} onChange={setRateValue} />
            </div>
            <div>
              <Button
                radius="full"
                className="bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg"
              >
                {" "}
                Post Comment
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CompanyComments;
