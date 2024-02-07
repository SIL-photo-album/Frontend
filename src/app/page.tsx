import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";

export default function page() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-16 gap-4">
        <h1 className="text-xl font-bold">SIL Frontend Engineer Assessment</h1>

        <span className="w-[700px] text-pretty">
          In this assessment text, I am building a web application that a person
          can login or signup using google or github. After authentication, the
          person can be able to see a list of all users with their albums and
          photos respectively.
        </span>

        <div></div>
      </div>
    </div>
  );
}
