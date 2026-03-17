import React from "react";
import logo from "../../public/assets/image/logo.webp";
import Image from "next/image";

export default function Header() {
  return (
    <header className="py-2.5 md:pt-5 shadow-md">
      <div className="container">
        <div className="p-2.5">
          <Image src={logo} alt="" className="w-25 md:w-50 mx-auto" />
        </div>
      </div>
    </header>
  );
}
