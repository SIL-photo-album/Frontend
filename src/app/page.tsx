import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import seminaPana from "./../../public/home/seminar-pana.svg";
import LoginButton from "@/components/button/LoginButton";

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="flex gap-5 px-[2em] justify-center items-center mt-[3em]">
        <div className="flex flex-col gap-4">
          <h1 className="text-[2em] uppercase font-bold">Photo Album</h1>
          <span>
            In this assessment test, I am building a web application <br /> that
            a person can login or signup using google or github. After
            authentication, <br />
            the person can be able to see a list of all users with their albums
            <br />
            and photos respectively.
          </span>

          <LoginButton />
        </div>
        <Image
          src={seminaPana}
          width={600}
          height={600}
          alt="semina-pana.svg"
        />
      </div>
    </div>
  );
}
