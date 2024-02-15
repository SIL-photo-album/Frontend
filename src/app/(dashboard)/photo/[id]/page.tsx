"use client";
import axios from "axios";
import Image from "next/image";
import backIcon from "./../../../../../public/backIcon.svg";
import { useEffect, useState } from "react";
import { photoInterface } from "../../../../../types";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [photo, setPhoto] = useState<photoInterface>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/photos/${params.id}`
        );
        if (response.status !== 200) {
          console.log("Error fetching photo data");
          return;
        }
        setPhoto(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [params.id]);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTitle) {
      alert("You need to add a new title");
      return;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${photo?.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: newTitle,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (!response.ok) {
        console.log("Error updating title");
        return;
      }
      const data = await response.json();
      setUpdatedTitle(data.title);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <button
        type="button"
        className="flex gap-1 justify-center items-center mt-5 border-black rounded-md"
        onClick={() => router.back()}
      >
        <Image src={backIcon} width={20} height={20} alt={backIcon} />
        <span>Go back</span>
      </button>

      {photo && (

        <figure className="max-w-lg ml-[1em] mb-[2em]">
          <Image
            width={600}
            height={600}
            className="h-auto max-w-full rounded-lg"
            src={photo.url}
            alt="image description"
          />
          <figcaption className="mt-2 text-sm text-center text-black dark:text-black">
            Title: {updatedTitle ? updatedTitle : photo.title}
          </figcaption>
          {!isEdit ? (
            <button
              className="rounded border-1 outline-none py-1 px-2 bg-blue-500 text-white"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          ) : (
            <form className="max-w-sm mx-auto" onSubmit={handleEditSubmit}>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="text"
                  placeholder="Enter new title"
                  className="bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </figure>
      )}
    </div>
  );
}
