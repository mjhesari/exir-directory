import { Card } from "@nextui-org/react";
// import ScrollingBanner from "../CompanyPartners/scrolling-banner";
// import {Logo1, Logo10, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo8, Logo9} from "../CompanyPartners/logos";
// const logos = [
//   {
//     key: "logo-1",
//     logo: Logo1,
//   },
//   {
//     key: "logo-2",
//     logo: Logo2,
//   },
//   {
//     key: "logo-3",
//     logo: Logo3,
//   },
//   {
//     key: "logo-4",
//     logo: Logo4,
//   },
//   {
//     key: "logo-5",
//     logo: Logo5,
//   },
//   {
//     key: "logo-6",
//     logo: Logo6,
//   },
//   {
//     key: "logo-7",
//     logo: Logo7,
//   },
//   {
//     key: "logo-8",
//     logo: Logo8,
//   },
//   {
//     key: "logo-9",
//     logo: Logo9,
//   },
//   {
//     key: "logo-10",
//     logo: Logo10,
//   },
// ];
const CompanyPartners = () => {
  return (
    <Card className="p-8 rounded-lg justify-center border" shadow="none">
      {/* <ScrollingBanner shouldPauseOnHover duration={10} gap="40px">
      {logos.map(({key, logo}) => (
          <div key={key} className="flex items-center justify-center text-foreground">
            {logo}
          </div>
          ))}
      </ScrollingBanner>
      <Spacer y={12} />
      <ScrollingBanner isReverse shouldPauseOnHover duration={10} gap="40px">
      {logos.map(({key, logo}) => (
          <div key={key} className="flex items-center justify-center text-foreground">
            {logo}
          </div>
        ))}
      </ScrollingBanner> */}
    </Card>
  );
};

export default CompanyPartners;
