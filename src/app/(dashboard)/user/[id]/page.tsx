"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import backIcon from "./../../../../../public/backIcon.svg";
import Album from "@/components/album/album";
import { album } from "../../../../../types";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [albums, setAlbums] = useState<any>([]);
  const [user, setUser] = useState<any>([]);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${params.id}`)
      .then(function (response) {
        // handle success
        if (response.status !== 200) {
        }

        setUser(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    axios
      .get(`https://jsonplaceholder.typicode.com/albums?userId=${params.id}`)
      .then(function (response) {
        // handle success
        if (response.status !== 200) {
        }

        setAlbums(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [params.id]);
  return (
    <div>
      <Navbar />
      <button
        type="button"
        className="flex gap-1 justify-center items-center mt-5 border-black rounded-md"
        onClick={() => router.back()}
      >
        <Image src={backIcon} width={20} height={20} alt={backIcon} />
        <span>Go back</span>
      </button>

      <h1 className="pt-3 px-2">User Name: {user.name}</h1>
      <div className="py-3 px-2">
        <h1 className="font-bold text-lg">Albums</h1>

        <div className="grid grid-cols-4 px-6 gap-7 mobile:grid-cols-2">
          {albums.map((album: album, index: number) => {
            return <Album title={album.title} albumId={album.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
