"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import User from "@/components/user/user";
import { user, userPropType } from "../../../../types";

export default function Users() {
  const [numberOfAlbums, setsetNumberOfAlbums] = useState<any>([]);
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    Promise.all([axios.get("https://jsonplaceholder.typicode.com/users")])
      .then((responses) => {
        const usersResponse = responses[0];
        if (usersResponse.status !== 200) {
          // handle error
        } else {
          setUsers(usersResponse.data);
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
              users.map((user: user, index: number) => {
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
                    key={index}
                    user={user}
                    numberOfAlbums={numberOfAlbums}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
