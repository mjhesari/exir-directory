import { Card } from "@heroui/card";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import ContactItems from "./ContactItems";
import { Business } from "@/types/dataTypes";
import EmailItems from "./EmailItems";
import ChatButton from "./ChatButton";
// import EmailItems from "./EmailItems";

const CompanyContact = ({
  exchangeData,
  dicts,
}: {
  exchangeData: Business;
  dicts: DictsTypes;
}) => {
  const { mail, phone,links } = exchangeData;
  const chatPlatforms= links?.length && links?.filter((link) =>
    link?.type?.includes("-chat"))
  return (
    <Card className="flex h-max border" shadow="none">
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
                    content={phone?.value ?? ""}
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
                  <EmailItems
                    dicts={dicts}
                    content={mail?.value ?? ""}
                  />
                </div>
              )
            )
          : null}
          {/* Chat Buttons */}
        <div className="flex flex-col gap-3 justify-center place-content-center items-center pb-2">
          {chatPlatforms.length ? chatPlatforms.map((link)=>(
            <ChatButton
            key={link.url}
            dicts={dicts}
            url={link.url}
            type={link.type}
            />
          )):null}
        </div>
      </div>
    </Card>
  );
};

export default CompanyContact;
