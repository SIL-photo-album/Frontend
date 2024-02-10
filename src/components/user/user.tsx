import Link from "next/link";
import React from "react";
import { userPropType } from "../../../types";

export default function User(data: userPropType) {
  return (
    <div
      key={data.user.id}
      className="flex flex-col gap-3 shadow-md border-1 rounded-md w-[300px] px-3"
    >
      <Link href={`/user/${data.user.id}`} className="hover:text-blue-500">
        {data.user.name}
      </Link>
      <span>Albums: {data.numberOfAlbums && data.numberOfAlbums.length}</span>
    </div>
  );
}
