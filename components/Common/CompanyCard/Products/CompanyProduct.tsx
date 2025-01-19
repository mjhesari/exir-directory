import { Icon } from "@iconify/react";
import { Button, Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import img6 from "@/public/image.png";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import SectionTitle from "../../pages/SearchFilter/SectionTitle";

const CompanyProduct = ({ dicts }: { dicts: DictsTypes }) => {
  return (
    <div className="rounded-lg border bg-white">
      <div>
          <SectionTitle>
          {dicts.productandService}
          </SectionTitle>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full place-items-center p-4 pt-0">
          <Card className="border rounded-t-xl" shadow="none">
            <CardBody className="flex flex-col p-0">
              <Image alt="" className="rounded-b-none w-full" src={img6} />
              <article className="flex justify-center gap-3 flex-col items-start p-5">
                <h4 className="font-bold text-large">Biannace Exchange</h4>
                <small className="text-default-500 text-left">
                  Largest cryptocurrency exchanges globally, offering a wide
                  range of digital assets for trading
                </small>
                <Button
                  className="bg-transparent text-indigo-500 ml-0 p-0"
                  endContent={
                    <Icon icon="ep:arrow-right" width="20" height="20" />
                  }
                >
                  Try it Now
                </Button>
              </article>
            </CardBody>
          </Card>
          <Card className="flex border rounded-t-xl" shadow="none">
            <CardBody className="flex flex-col p-0">
              <Image alt="" className="rounded-b-none w-full" src={img6} />
              <article className="flex justify-center gap-3 flex-col items-start p-5">
                <h4 className="font-bold text-large">Biannace Exchange</h4>
                <small className="text-default-500 text-left">
                  Largest cryptocurrency exchanges globally, offering a wide
                  range of digital assets for trading
                </small>
                <Button
                  className="bg-transparent text-indigo-500 ml-0 p-0"
                  endContent={
                    <Icon icon="ep:arrow-right" width="20" height="20" />
                  }
                >
                  {dicts.button.tryItNow}{" "}
                </Button>
              </article>
            </CardBody>
          </Card>
          <Card className="flex border rounded-t-xl" shadow="none">
            <CardBody className="flex flex-col p-0">
              <Image alt="" className="rounded-b-none w-full" src={img6} />
              <article className="flex justify-center gap-3 flex-col items-start p-5">
                <h4 className="font-bold text-large">Biannace Exchange</h4>
                <small className="text-default-500 text-left">
                  Largest cryptocurrency exchanges globally, offering a wide
                  range of digital assets for trading
                </small>
                <Button
                  className="bg-transparent text-indigo-500 ml-0 p-0"
                  endContent={
                    <Icon icon="ep:arrow-right" width="20" height="20" />
                  }
                >
                  Try it Now
                </Button>
              </article>
            </CardBody>
          </Card>
          <Card className="flex border rounded-t-xl" shadow="none">
            <CardBody className="flex flex-col p-0">
              <Image alt="" className="rounded-b-none w-full" src={img6} />
              <article className="flex justify-center gap-3 flex-col items-start p-5">
                <h4 className="font-bold text-large">Biannace Exchange</h4>
                <small className="text-default-500 text-left">
                  Largest cryptocurrency exchanges globally, offering a wide
                  range of digital assets for trading
                </small>
                <Button
                  className="bg-transparent text-indigo-500 ml-0 p-0"
                  endContent={
                    <Icon icon="ep:arrow-right" width="20" height="20" />
                  }
                >
                  Try it Now
                </Button>
              </article>
            </CardBody>
          </Card>
          <Card className="flex border rounded-t-xl" shadow="none">
            <CardBody className="flex flex-col p-0">
              <Image alt="" className="rounded-b-none w-full" src={img6} />
              <article className="flex justify-center gap-3 flex-col items-start p-5">
                <h4 className="font-bold text-large">Biannace Exchange</h4>
                <small className="text-default-500 text-left">
                  Largest cryptocurrency exchanges globally, offering a wide
                  range of digital assets for trading
                </small>
                <Button
                  className="bg-transparent text-indigo-500 ml-0 p-0"
                  endContent={
                    <Icon icon="ep:arrow-right" width="20" height="20" />
                  }
                >
                  Try it Now
                </Button>
              </article>
            </CardBody>
          </Card>
          <Card className="flex border rounded-t-xl" shadow="none">
            <CardBody className="flex flex-col p-0">
              <Image alt="img" className="rounded-b-none w-full" src={img6} />
              <article className="flex justify-center gap-3 flex-col items-start p-5">
                <h4 className="font-bold text-large">Biannace Exchange</h4>
                <small className="text-default-500 text-left">
                  Largest cryptocurrency exchanges globally, offering a wide
                  range of digital assets for trading
                </small>
                <Button
                  className="bg-transparent text-indigo-500 ml-0 p-0"
                  endContent={
                    <Icon icon="ep:arrow-right" width="20" height="20" />
                  }
                >
                  Try it Now
                </Button>
              </article>
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default CompanyProduct;
