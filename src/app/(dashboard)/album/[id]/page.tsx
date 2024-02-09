"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/navbar/Navbar";
import { photoInterface } from "../../../../../types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import backIcon from "./../../../../../public/backIcon.svg";

export default function Page({ params }: { params: { id: string } }) {
  const [photos, setPhotos] = useState<photoInterface[]>([]);
  const [album, seAlbum] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${params.id}`)
      .then(function (response) {
        // handle success
        if (response.status !== 200) {
        }

        seAlbum(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${params.id}`)
      .then(function (response) {
        // handle success
        if (response.status !== 200) {
        }

        setPhotos(response.data);
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
        className="flex pt-3 px-2 gap-1 justify-center items-center border-black rounded-md"
        onClick={() => router.back()}
      >
        <Image src={backIcon} width={20} height={20} alt={backIcon} />
        <span>Go back</span>
      </button>
      <div className="flex flex-col gap-5 pt-3 px-2">
        <div className="flex gap-2">
          <h1 className="font-bold">Album Name:</h1>
          <span> {album && album.title}</span>
        </div>

        <div className="grid py-3 grid-cols-4 gap-5 px-3 mobile:grid-cols-2">
          {photos &&
            photos.map((photo: photoInterface, index: number) => {
              return (
                <Link
                  href={`/photo/${photo.id}`}
                  key={index}
                  className="flex flex-col shadow-md rounded-md gap-2 cursor-pointer"
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.thumbnailUrl}
                    className="w-[150px] h-[150px]"
                  />
                  <span className="flex flex-nowrap">{photo.title}</span>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
