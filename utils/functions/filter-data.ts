
//* Convert filter object to verify body

type BodyType = {
  tags: string[];
  country: string | null;
  attributes: { key: string; value: string | string[] }[];
  name: { [key: string]: string };
  region: string;
  city: string;
};
type UnknownObj = Record<
  string,
  string | string[] | { [key: string]: string } | BodyType["attributes"]
>;
export const filterObjectConverter = (filters: UnknownObj) => {
  return Object.entries(filters ?? {}).reduce((acc: UnknownObj, key) => {
    const condition = () => {
      if (Array.isArray(key[1])) {
        if (typeof key[1][0] === "object") {
          return (key[1] as BodyType["attributes"]).some(
            (key) => key?.value?.length
          )
            ? true
            : false;
        } else {
          return key[1].length ? true : false;
        }
      } else if (typeof key[1] === "object") {
        return Object.values(key?.[1]).some((key) => key.length) ? true : false;
      } else {
        return key[1].length ? true : false;
      }
    };

    if (condition()) {
      const value =
        Array.isArray(key?.[1]) && typeof key[1][0] === "object"
          ? (key?.[1] as BodyType["attributes"]).filter((filter) =>
              Boolean(filter.value.length)
            )
          : key?.[1];
      acc[key?.[0]] = value;
    }
    return acc;
  }, {});
};
