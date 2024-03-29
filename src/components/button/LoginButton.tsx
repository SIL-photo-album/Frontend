"use client";

import googleImg from "./../../../public/google.svg";
import Image from "next/image";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginButton() {
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
    try {
      localStorage.clear();
      router.push("/");
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");

    setUserEmail(email);
  }, []);
  return (
    <div>
      {!userEmail && (
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-2 px-3 py-1 border-[1px] border-black rounded-md outline-none mobile:text-small mobile:flex-nowrap"
          data-testid="signIn"
        >
          <Image src={googleImg} width={20} height={20} alt={googleImg} />
          Sign in with Google
        </button>
      )}

      {userEmail && (
        <div className="flex gap-4">
          <Link href="/home" className="hover:text-blue-500">
            Home
          </Link>
          <button onClick={logOut} data-testid="Logout">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
