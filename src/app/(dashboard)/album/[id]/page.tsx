"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/navbar/Navbar";
import { photoInterface } from "../../../../../types";
import Link from "next/link";

export default function page({ params }: any) {
  const [photos, setPhotos] = useState<photoInterface[]>([]);
  const [album, seAlbum] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${params.id}`)
      .then(function (response) {
        // handle success
        if (response.status !== 200) {
        }

        seAlbum(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${params.id}`)
      .then(function (response) {
        // handle success
        if (response.status !== 200) {
        }

        console.log(response.data);
        setPhotos(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        <h1>Album Name: {album && album.title}</h1>

        <div className="grid grid-cols-4 gap-5 px-6">
          {photos &&
            photos.map((photo: photoInterface, index: number) => {
              return (
                <Link
                  href={`/photo/${photo.id}`}
                  key={index}
                  className="shadow-md rounded-md cursor-pointer"
                >
                  <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl} />
                  <span className="w-[80px]">{photo.title}</span>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
