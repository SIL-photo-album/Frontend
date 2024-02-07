"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function users() {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(function (response) {
        // handle success
        if (response.status !== 200) {
        }

        console.log(response.data);
        setUsers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Navbar />

      <div className="flex flex-col gap-1">
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
      </div>
    </div>
  );
}
