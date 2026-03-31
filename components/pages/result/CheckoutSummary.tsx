import React from "react";

interface SummaryItem {
  label: string;
  value: string;
}

interface CheckoutSummaryProps {
  dogs: string;
  frequency: string;
  surface: string;
  services: string;
  startTime: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface SummaryRowProps extends SummaryItem {
  isLast?: boolean;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value, isLast }) => (
  <div
    className={`flex justify-between items-start py-5 max-sm:py-2 max-sm:flex-col gap-y-1 gap-2 ${!isLast ? "border-b border-[#E7DFDA]" : ""}`}
  >
    <span className="text-[#8f7c70] text-[15px] leading-[150%]">{label}</span>
    <span className="text-[#2C1C11] font-bold text-right text-[15px]">
      {value ? value : "—"}
    </span>
  </div>
);

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ dogs, frequency, surface, services, startTime, name, email, phone, address }) => {
  const orderSummary: SummaryItem[] = [
    { label: "Service frequency", value: frequency },
    { label: "Dog count", value: dogs },
    { label: "Backyard surface", value: surface },
    { label: "Selected services", value: services },
    { label: "Start time", value: startTime || "—" },
  ];

  const contactDetails: SummaryItem[] = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
    { label: "Address", value: address },
  ];
  return (
    <>
      {/* Order Summary Card */}
      <div className="border border-[#E7DFDA] p-3.5 sm:p-5 rounded-[0.6rem] bg-linear-to-t from-[#FFFFFF] to-[#F5F2EF]  shadow-[0_12px_28px_-24px_rgba(66,158,188,0.55)]">
        {/* <div className="flex justify-between sm:items-center max-sm:flex-col pb-3.5 gap-1 border-b border-[#E7DFDA]">
          <h2 className="text-[#8f7c70] text-[12.8px] uppercase leading-[150%]">
            Estimated Total
          </h2>
          <span className="text-[#429EBC] text-3xl  font-extrabold leading-[155%]">
            $135
          </span>
        </div> */}

        <div className="flex flex-col">
          {orderSummary.map((item, index) => (
            <SummaryRow
              key={`order-${index}`}
              label={item.label}
              value={item.value}
              isLast={index === orderSummary.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Contact Details Card */}
      <div className="border border-[#E7DFDA] p-3.5 sm:p-5 rounded-[0.6rem] bg-linear-to-t from-[#FFFFFF] to-[#F5F2EF]  shadow-[0_12px_28px_-24px_rgba(66,158,188,0.55)]">
        <h2 className="text-[#8f7c70] mt-2 pb-1 text-[15.2px] leading-[150%] ">
          Contact details
        </h2>
        <div className="flex flex-col">
          {contactDetails.map((item, index) => (
            <SummaryRow
              key={`contact-${index}`}
              label={item.label}
              value={item.value}
              isLast={index === contactDetails.length - 1}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CheckoutSummary;
