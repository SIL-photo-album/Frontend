"use client";
import axios from "axios";
import Image from "next/image";
import backIcon from "./../../../../../public/backIcon.svg";
import { useEffect, useState } from "react";
import { photoInterface } from "../../../../../types";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";

export default function page({ params }: any) {
  const router = useRouter();
  const [photo, setPhoto] = useState<photoInterface>();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos/${params.id}`)
      .then(function (response) {
        // handle success
        if (response.status !== 200) {
        }

        setPhoto(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <button
        type="button"
        className="flex gap-1 justify-center items-center border-black rounded-md"
        onClick={() => router.back()}
      >
        <Image src={backIcon} width={20} height={20} alt={backIcon} />
        <span>Go back</span>
      </button>
      {photo && (
        <div
          className="flex flex-col items-center 
         h-[100vh] "
        >
          <img
            src={photo.url}
            className="w-[600px] h-[600px] rounded"
            alt={photo.url}
          />
          <h1 className="flex gap-2">
            Title:
            <span className="font-bold">{photo.title}</span>
          </h1>
        </div>
      )}
    </div>
  );
}
