"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import googleImg from "./../../../public/google.svg";
import Image from "next/image";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("email", JSON.stringify(result.user.email));
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    router.push("/");
    try {
      await signOut(auth);
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");

    setUserEmail(email);
  }, []);
  return (
    <div className="flex justify-between px-16 py-8 shadow-md mobile:px-5">
      <Link href="/">Ian Kamau</Link>
      {userEmail !== null ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-2 px-3 py-1 border-[1px] border-black rounded-md outline-none mobile:text-small mobile:flex-nowrap"
        >
          <Image src={googleImg} width={20} height={20} alt={googleImg} />
          Sign in with Google
        </button>
      )}
    </div>
  );
}
