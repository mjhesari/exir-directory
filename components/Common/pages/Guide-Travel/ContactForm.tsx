"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icon } from "@iconify/react";
import { 
  Button, 
  Input, 
  Select, 
  SelectItem, 
  Card, 
  CardBody, 
  CardHeader, 
  Divider,
  Chip
} from "@heroui/react";
import { countries } from "@/utils/data/countries";

// Form validation schema with Yup
const formSchema = yup.object({
  firstName: yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  country: yup.string()
    .required("Please select a country"),
  countryCode: yup.string()
    .required("Country code is required"),
  whatsappNumber: yup.string()
    .min(5, "Phone number is too short")
    .max(15, "Phone number is too long")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .required("WhatsApp number is required"),
});

type FormValues = yup.InferType<typeof formSchema>;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    getValues,
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const selectedCountry = watch("country");

  // Update country code when country changes
  React.useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((c) => c.code === selectedCountry);
      if (country) {
        setValue("countryCode", country.dialCode);
        setSelectedFlag(country.flag);
      }
    }
  }, [selectedCountry, setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  // Custom register for NextUI components
  const customRegister = (name: keyof FormValues) => {
    const { ref, ...rest } = register(name);
    return {
      ...rest,
      ref,
      value: watch(name) || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(name, e.target.value, { shouldValidate: true });
      }
    };
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-col items-center gap-3 pb-0">
        <h2 className="text-2xl font-bold text-foreground"></h2>
        <p className="text-default-500 text-center">استلام دليل السفر المجاني على رقم واتساب</p>
      </CardHeader>

      <CardBody>
        {isSuccess && (
          <Chip 
            color="success" 
            variant="bordered" 
            startContent={<Icon icon="mdi:check" className="h-4 w-4" />}
            className="mb-4 w-full justify-start"
          >
            Form submitted successfully!
          </Chip>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="الاسم"
                labelPlacement='outside'
                placeholder="علاوی"
                isRequired
                isInvalid={!!errors.firstName}
                errorMessage={errors.firstName?.message}
                {...customRegister("firstName")}
              />
            </div>

            <div>
              <Input
                label="اللقب"
                labelPlacement='outside'
                placeholder="شاکرین"
                isRequired
                isInvalid={!!errors.lastName}
                errorMessage={errors.lastName?.message}
                {...customRegister("lastName")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Select
              label="الدولة"
              labelPlacement='outside'
              placeholder="اختر دولة"
              isRequired
              isInvalid={!!errors.country}
              errorMessage={errors.country?.message}
              selectedKeys={selectedCountry ? [selectedCountry] : []}
              onChange={(e) => {
                setValue("country", e.target.value, { shouldValidate: true });
              }}
              startContent={
                selectedFlag ? (
                  <Icon icon={selectedFlag} width="20" height="15" />
                ) : null
              }
              classNames={{
                value: "pl-1"
              }}
            >
              {countries?.map((country) => (
                <SelectItem 
                  key={country.code} 
                  startContent={
                    <Icon icon={country.flag} width="20" height="15" />
                  }
                >
                  {country.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
            رقم واتساب<span className="text-danger">*</span>
            </label>
            <div className="flex gap-2" dir="ltr">
              <div className="w-1/3">
                <Input
                  placeholder="رمز الدولة"
                  isReadOnly
                  isInvalid={!!errors.countryCode}
                  value={getValues("countryCode") || ""}
                  startContent={
                    selectedFlag ? (
                      <Icon icon={selectedFlag} width="20" height="15" />
                    ) : null
                  }
                  classNames={{
                    input: "pl-1"
                  }}
                  {...register("countryCode")}
                />
              </div>
              <div className="w-2/3">
                <Input
                  placeholder="937878882"
                  isInvalid={!!errors.whatsappNumber}
                  errorMessage={errors.whatsappNumber?.message}
                  {...customRegister("whatsappNumber")}
                />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm text-default-500">
              <Icon icon="mdi:message-square" className="h-4 w-4 mr-1" />
              <span>سنتواصل معك عبر واتساب</span>
            </div>
          </div>

          <Divider className="my-4" />

          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isSubmitting}
            isDisabled={!isValid || isSubmitting}
          >
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ContactForm;