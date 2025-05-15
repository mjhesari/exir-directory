import { RadioGroup, Radio } from "@heroui/react";

export default function ServiceSelect() {
  return (
    <div>
      <h3 className="font-semibold mb-3">اختيار نوع الخدمة</h3>
      <RadioGroup color="secondary">
        <Radio value="VIP → كبار الشخصيات" className="font-light">
          VIP/كبار الشخصيات
        </Radio>
        <Radio value="اقتصادي" className="font-light">
          اقتصادي
        </Radio>
      </RadioGroup>
    </div>
  );
}
