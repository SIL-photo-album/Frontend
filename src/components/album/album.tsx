import Link from "next/link";
import albumImage from "./../../../public/album.svg"
import Image from "next/image";

export default function Album({
  title,
  albumId,
}: {
  title: string;
  albumId: number;
}) {
  return (
    <Link
      href={`/album/${albumId}`}
      className="shadow-md cursor-pointer flex flex-col item-center justify-center px-3 py-5 rounded-md gap-2 hover:shadow-lg"
    >
      <Image src={albumImage} width={70} height={70} alt={albumImage} />
      <span>{title}</span>
    </Link>
  );
}
