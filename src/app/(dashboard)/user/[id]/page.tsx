"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import albumImage from "./../../../../../public/album.svg";

export default function page({ params }: any) {
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
  }, []);
  return (
    <div>
      <Navbar />

      <h1>User Name: {user.name}</h1>
      <div>
        <h1 className="font-bold text-lg">Albums</h1>

        <div className="grid grid-cols-4 px-6 gap-7">
          {albums.map((album: any, index: number) => {
            return (
              <Link
                href={`/album/${album.id}`}
                key={index}
                className="shadow-md cursor-pointer flex flex-col item-center justify-center px-3 py-5 rounded-md gap-2 hover:shadow-lg"
              >
                <Image
                  src={albumImage}
                  width={70}
                  height={70}
                  alt={albumImage}
                />
                <span>{album.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
