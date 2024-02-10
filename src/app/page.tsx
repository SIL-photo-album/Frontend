import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import homeUserImg from "./../../public/home/homePageUsers.png";
import homeUserAlbumsImg from "./../../public/home/homePageUsersAbums.png";

export default function Page() {
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
        <span>
          Click the "Sign in with Google" button to sign up or login. After
          signing up, you will be redirected to the home page.
        </span>

        <div className="py-[2em]">
          <div className="flex flex-col gap-[3em]">
            <div className="flex flex-col gap-[10px]">
              <span className="font-bold">
                Here you can see all users. You can click any user and see all
                albums associating with the user
              </span>
              <Image
                src={homeUserImg}
                alt="homeUserImg.png"
                className="w-[1100px] border rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-[10px] mt-[1em]">
              <span className="font-bold">
                Here you can see all albums. You can click any album and see all
                photos associating with the album
              </span>
              <Image
                src={homeUserAlbumsImg}
                alt="homeUserAlbumsImg.png"
                className="w-[1100px] border rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
