"use client";
import Link from "next/link";
import React from "react";
import googleImg from "./../../../public/google.svg";
import Image from "next/image";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user.email);
      localStorage.setItem("email", JSON.stringify(result.user.email));
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  const userEmail = localStorage.getItem("email");
  return (
    <div className="flex justify-between px-16 py-8 shadow-md">
      <Link href="/">Ian Kamau</Link>
      {userEmail !== null ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-2 px-3 py-1 border-[1px] border-black rounded-md outline-none"
        >
          <Image src={googleImg} width={20} height={20} alt={googleImg} />
          Sign in with Google
        </button>
      )}
    </div>
  );
}
