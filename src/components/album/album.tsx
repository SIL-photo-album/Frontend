import Link from "next/link";
import albumImage from "./../../../public/album.svg";

import Image from "next/image";

export default function Album({
  title,
  id,
  imgUrl,
  size,
}: {
  title: string;
  imgUrl?: string;
  id: string;
  size?: number;
}) {
  return (
    <Link
      href={id}
      className="shadow-md cursor-pointer flex flex-col item-center justify-center px-3 py-5 rounded-md gap-2 hover:shadow-lg"
    >
      <Image
        src={imgUrl || albumImage}
        width={size || 70}
        height={size || 70}
        alt={imgUrl || albumImage}
      />
      <span>{title}</span>
    </Link>
  );
}
