import Header from "@/components/global/Header";
import CheckoutSummary from "@/components/pages/result/CheckoutSummary";
import React from "react";

export default function vPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="flex-1 flex-col flex justify-center md:py-25 py-12">
        <div className="container max-w-230.5! flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl leading-[120%] text-dark font-bold">
              Thanks for requesting a quote Rahmat!
            </h1>
            <p className="text-[#8F7C70] text-base leading-[150%] ">
              One of our team members will be reaching out shortly!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-[21.6px] leading-[120%] text-dark font-bold">
              Your instant quote
            </h2>
            <span className="text-[11px] font-semibold leading-[155%] bg-[#429EBC24] text-primary-color px-3 flex items-center rounded-full uppercase py-1">
              Summary
            </span>
          </div>

          {/* <p className="w-full py-3 px-3.5 border-dashed border-[#E7DFDA] border text-[15px] rounded-lg bg-[#F5F2EF] text-[#2C1C11] leading-[150%]">
            If pricing isn’t showing, text{" "}
            <span className="font-bold underline">(708) 500-5016</span> and
            we’ll send pricing immediately. Sorry for the inconvenience.
          </p> */}
          <p className="w-full py-3 px-3.5 border-dashed border-[#E7DFDA] border text-[15px] rounded-lg bg-[#F5F2EF] text-[#2C1C11] leading-[150%]">
            Thank you for your interest you will receive a quote texted from{" "}
            <span className="font-bold underline">(708) 500-5016</span> shortly.
          </p>

          <CheckoutSummary />
          <p className="text-[#8F7C70] text-sm leading-[150%]">
            The prices shown are instant estimates meant to give you a quick
            idea of what to expect. We’ll still reach out to confirm your
            selections, verify details, and finalize your booking before
            anything is set in stone.
          </p>
        </div>
      </section>
    </main>
  );
}
