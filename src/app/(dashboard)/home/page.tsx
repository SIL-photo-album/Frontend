"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import albumImage from "./../../../../public/album.svg";
import { useState, useEffect, Suspense } from "react";
import User from "@/components/user/user";
import { album, user } from "../../../../types";
import Loading from "@/app/loading";
import UserLoader from "@/components/loading/User.loader";
import Album from "@/components/album/album";

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
                  <Suspense fallback={<Loading />} key={user.id}>
                    <User user={user} numberOfAlbums={numberOfAlbums} />
                  </Suspense>
                );
              })}
          </div>
        </div>

        <div>
          <h1 className="font-bold text-lg">Albums</h1>

          <div className="grid grid-cols-4 px-6 gap-7 mobile:grid-cols-2 mobile:px-3">
            {albums.map((album: album, index: number) => {
              return (
                <Suspense fallback={<UserLoader />} key={index}>
                  <Album title={album.title} albumId={album.id} />
                </Suspense>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
