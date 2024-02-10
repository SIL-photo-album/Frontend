"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import albumImage from "./../../../../public/album.svg";
import { useState, useEffect } from "react";
import User from "@/components/user/user";
import { album, user } from "../../../../types";

export default function Users() {
  const [numberOfAlbums, setsetNumberOfAlbums] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [albums, setAlbums] = useState<any>([]);

  useEffect(() => {
    Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/users"),
      axios.get("https://jsonplaceholder.typicode.com/albums"),
    ])
      .then(function (responses) {
        const usersResponse = responses[0];
        const albumsResponse = responses[1];

        if (usersResponse.status !== 200) {
          // handle error
        } else {
          setUsers(usersResponse.data);
        }

        if (albumsResponse.status !== 200) {
          // handle error
        } else {
          setAlbums(albumsResponse.data);
        }
      })
      .catch(function (errors) {
        console.log(errors);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex flex-col gap-2 p-[1em]">
        <div className="flex flex-col gap-3 mt-4">
          <h1 className="font-bold text-lg">Users</h1>

          <div className="flex flex-wrap items-center ml-[2em] py-[2em] gap-[2em]">
            {users &&
              users.map((user: user) => {
                axios
                  .get(
                    `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`
                  )
                  .then(function (response) {
                    // handle success
                    if (response.status !== 200) {
                    }

                    setsetNumberOfAlbums(response.data);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

                return (
                  <User
                    key={user.id}
                    user={user}
                    numberOfAlbums={numberOfAlbums}
                  />
                );
              })}
          </div>
        </div>

        <div>
          <h1 className="font-bold text-lg">Albums</h1>

          <div className="grid grid-cols-4 px-6 gap-7">
            {albums.map((album: album, index: number) => {
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
                  <span className="hover:text-blue-500">{album.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
