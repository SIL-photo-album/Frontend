"use client"
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "@/components/navbar/Navbar";
import { photoInterface } from "../../../../../types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import backIcon from "./../../../../../public/backIcon.svg";

export default function Page({ params }: { params: { id: string } }) {
  const [photos, setPhotos] = useState<photoInterface[]>([]);
  const [album, setAlbum] = useState<any>([]);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const [albumResponse, photosResponse] = await Promise.all([
        axios.get(`https://jsonplaceholder.typicode.com/albums/${params.id}`),
        axios.get(
          `https://jsonplaceholder.typicode.com/photos?albumId=${params.id}`
        ),
      ]);

      if (albumResponse.status !== 200 || photosResponse.status !== 200) {
        console.log("Error fetching data");
        return;
      }

      setAlbum(albumResponse.data);
      setPhotos(photosResponse.data);
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          {photos.map((photo: photoInterface, index: number) => (
            <Link
              href={`/photo/${photo.id}`}
              key={index}
              className="flex flex-col shadow-md rounded-md gap-2 cursor-pointer"
            >
              <Image
                src={photo.thumbnailUrl}
                alt={photo.thumbnailUrl}
                width={150}
                height={150}
                loading="lazy" // Lazy loading for images
              />
              <span className="flex flex-nowrap">{photo.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
