import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";

const FooterIranarabic = ({ dicts }: { dicts: DictsTypes }) => {
  return (
    <div className="bg-white border-t  h-10">
      <footer className="flex justify-center container mx-auto p-2 items-center">
          <h3 className="mx-2 text-default-500">© 2025 {dicts?.DirectoryName.iranarabic}</h3>
      </footer>
    </div>
  );
};

export default FooterIranarabic;
