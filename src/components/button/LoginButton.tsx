"use client";

import googleImg from "./../../../public/google.svg";
import Image from "next/image";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
