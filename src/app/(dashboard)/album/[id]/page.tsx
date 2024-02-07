"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/navbar/Navbar";

export default function page({ params }: any) {
  const [photos, setPhotos] = useState<any>([]);
  const [album, seAlbum] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/album/${params.id}`)
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
    </div>
  );
}
