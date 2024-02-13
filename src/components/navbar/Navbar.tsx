"use client";
import Link from "next/link";
import LoginButton from "../button/LoginButton";

export default function Navbar() {
  return (
    <div className="flex justify-between px-16 py-8 shadow-md mobile:px-5">
      <Link href="/">Ian Kamau</Link>
      <LoginButton />
    </div>
  );
}
