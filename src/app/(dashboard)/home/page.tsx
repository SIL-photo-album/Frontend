"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import { useState, useEffect} from "react";
import { user } from "../../../../types";
import Loading from "./loading";
import dynamic from "next/dynamic";

export default function Users() {
  const User = dynamic(() => import("@/components/user/user"), {
    loading: () => <Loading />,
  });
  const [numberOfAlbums, setNumberOfAlbums] = useState<any>([]);
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (usersResponse.status !== 200) {
          console.log("Error");
          return;
        }
        setUsers(usersResponse.data);

        // Fetch albums for each user
        const albumsPromises = usersResponse.data.map((user: user) =>
          axios.get(
            `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`
          )
        );
        const albumsResponses = await Promise.all(albumsPromises);
        const albumsData = albumsResponses.map((response) => response.data);
        setNumberOfAlbums(albumsData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex flex-col gap-2 p-[1em]">
        <div className="flex flex-col gap-3 mt-4">
          <h1 className="font-bold text-lg">Users</h1>

          <div className="flex flex-wrap items-center ml-[2em] py-[2em] gap-[2em]">
            {users.map((user: user, index: number) => (
              <User
                key={index}
                user={user}
                numberOfAlbums={numberOfAlbums[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
