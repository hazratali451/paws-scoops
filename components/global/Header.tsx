import React from "react";
import logo from "../../public/assets/image/logo.webp";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";

export default function Header() {
  return (
    <header className="sm:py-2.5 py-1 shadow-md sticky top-0 w-full bg-white z-20">
      <div className="container max-w-360!">
        <div className=" flex justify-between items-center w-full">
          <Image src={logo} alt="" className="w-12 md:w-20 " priority />
          <a
            href="tel:7085005016"
            className="flex items-center gap-2 bg-primary-color text-white text-sm font-medium px-4 py-2.5 rounded-md"
          >
            <FiPhone className="size-4" />
            (708) 500-5016
          </a>
        </div>
      </div>
    </header>
  );
}
