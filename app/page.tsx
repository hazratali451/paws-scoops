"use client";

import Header from "@/components/global/Header";
import ChooseSurface from "@/components/pages/home/ChooseSurface";
import ContactInformation from "@/components/pages/home/ContactInformation";
import PickDogsNumber from "@/components/pages/home/PickDogsNumber";
import PickService from "@/components/pages/home/PickService";
import SelectVisitingTime from "@/components/pages/home/SelectVisitingTime";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Header />
        <section className="flex-1 flex-col flex justify-center md:py-25 py-12">
          <div className="container">
            <div>
              <div className={`${step === 1 ? "block" : "hidden"}`}>
                <PickDogsNumber onNext={() => setStep(2)} />
              </div>
              <div className={`${step === 2 ? "block" : "hidden"}`}>
                <SelectVisitingTime
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              </div>
              <div className={`${step === 3 ? "block" : "hidden"}`}>
                <ChooseSurface
                  onNext={() => setStep(4)}
                  onBack={() => setStep(2)}
                />
              </div>
              <div className={`${step === 4 ? "block" : "hidden"}`}>
                <PickService
                  onNext={() => setStep(5)}
                  onBack={() => setStep(3)}
                />
              </div>
              <div className={`${step === 5 ? "block" : "hidden"}`}>
                <ContactInformation
                  // onNext={() => setStep(5)}
                  onBack={() => setStep(1)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
