import { Icon } from "@iconify/react";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import ContactItems from "./ContactItems";
import { Business } from "@/types/dataTypes";
// import EmailItems from "./EmailItems";

const CompanyContact = ({
  exchangeData,
  dicts,
}: {
  exchangeData: Business;
  dicts: DictsTypes;
}) => {
  const { mail, phone } = exchangeData;
  return (
    <Card className="flex lg:sticky lg:top-20 h-max border" shadow="none">
      <h3 className="font-semibold text-lg px-4 pt-5 pb-2">
        {dicts?.infoContact.contact}
      </h3>
      <div className="space-y-3 mb-2 mx-4">
      {phone?.length
          ? phone?.map(
              (phone: { title: string; value: string }, index: number) => (
                <div
                  key={phone?.value ?? ""}
                  data-aos="fade-left"
                  data-aos-delay={index * 100}
                  data-aos-offset="100"
                >
                  <ContactItems
                  dicts={dicts}
                    type="phone"
                    content={phone?.value ?? ""}
                    exchangeData={exchangeData}
                  />
                </div>
              )
            )
          : null}
        {/* Emails */}
        {mail?.length
          ? mail.map(
              (mail: { title: string; value: string }, index: number) => (
                <div
                  key={mail?.value ?? ""}
                  data-aos="fade-left"
                  data-aos-delay={index * 100}
                  data-aos-offset="100"
                >
                  <ContactItems
                    type="mail"
                    dicts={dicts}
                    content={mail?.value ?? ""}
                    exchangeData={exchangeData}
                  />
                </div>
              )
            )
          : null}
        {/* <EmailItems exchangeData={exchangeData} dicts={dicts} /> */}
        <div className="flex justify-center place-content-center items-center pb-2">
          <Button
            className="w-full bg-green-500/20 text-green-500 hover:bg-green-300 rounded-xl"
            startContent={<Icon icon="ic:twotone-whatsapp" width='20' />}
            size="lg"
          >
            Whatsapp Chat
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CompanyContact;
