"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import albumImage from "./../../../../public/album.svg";
import { useState, useEffect } from "react";

export default function users() {
  const [users, setUsers] = useState<any>([]);
  const [albums, setAlbums] = useState<any>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(function (response) {
        // handle success
        if (response.status !== 200) {
        }

        setUsers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then(function (response) {
        // handle success
        if (response.status !== 200) {
        }

        console.log(response.data);
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

      <div className="flex flex-col gap-2">
        {users &&
          users.map((user: { id: number; name: string }) => {
            return (
              <div key={user.id}>
                <Link href={`/user/${user.id}`} className="hover:text-blue-500">
                  {user.name}
                </Link>
              </div>
            );
          })}

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
    </div>
  );
}
