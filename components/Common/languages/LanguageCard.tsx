"use client"
import { LanguagesTypes } from "@/types/dataTypes";
import { Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation"; // استفاده از useRouter از next/navigation
import { usePathname, useSearchParams } from "next/navigation"; // برای دریافت مسیر فعلی و پارامترها

const LanguageCard = ({
  language,
  selectedLanguage,
  searchQuery,
}: {
  language: LanguagesTypes;
  selectedLanguage: string;
  searchQuery: string;
}) => {
  const router = useRouter(); // استفاده از useRouter برای هدایت
  const pathname = usePathname(); // دریافت مسیر فعلی
  const searchParams = useSearchParams(); // دریافت پارامترهای query

  const handleLanguageChange = (languageCode: string) => {
    // برای استخراج زبان فعلی از مسیر
    const pathSegments = pathname.split("/").filter(Boolean);

    // اگر زبان فعلی در ابتدای مسیر است، آن را حذف کرده و زبان جدید را اضافه می‌کنیم
    if (pathSegments.length > 0 && pathSegments[0] !== languageCode) {
      pathSegments[0] = languageCode; // تغییر زبان
    }

    // ساخت URL جدید با زبان جدید و مسیر فعلی
    const newPathname = `/${pathSegments.join("/")}`;

    // هدایت به URL جدید با حفظ پارامترهای query
    router.push(`${newPathname}?${searchParams.toString()}`);
  };

  const sortedLanguages = language
    ?.filter((e) =>
      e.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (a.code === selectedLanguage ? -1 : b.code === selectedLanguage ? 1 : 0));

  return (
    <div className="px-0" aria-label="Language Card">
      <div className="grid">
        {sortedLanguages?.map((e) => (
          <ul className="" key={e.id}>
            <li
              key={e.id}
              className={`h-12 flex flex-col relative hover:bg-default-200 cursor-pointer transition-colors font-medium ${
                selectedLanguage === e.code ? "bg-default-200" : ""
              }`}
              onClick={() => handleLanguageChange(e.code)} // تغییر زبان
            >
              <div className="absolute inset-0 place-items-center justify-between flex px-2">
                {e.nativeName}
                {selectedLanguage === e.code && (
                  <span className="ml-2 text-default-500">✔</span>
                )}
              </div>
            </li>
            <Divider className="my-0" />
          </ul>
        ))}
      </div>
    </div>
  );
};

export default LanguageCard;
