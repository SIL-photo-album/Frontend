import Link from "next/link";
import React from "react";
import googleImg from "./../../../public/google.svg";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex justify-between px-16 py-8 shadow-md">
      <Link href="/">Ian Kamau</Link>
      <button className="flex items-center gap-2 px-3 py-1 border-[1px] border-black rounded-md outline-none">
        <Image src={googleImg} width={20} height={20} alt={googleImg} />
        Login with Google
      </button>
    </div>
  );
}
