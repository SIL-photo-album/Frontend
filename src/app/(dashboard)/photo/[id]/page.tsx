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
        <div
          className="flex flex-col justify-start items-start py-[2em] mt-[10px]
         mobile:overflow-hidden mobile:px-3 ml-[1em]"
        >
          <Image
            width={600}
            height={600}
            src={photo.url}
            className="w-[600px] h-[600px] rounded mobile:w-[300px] mobile:h-[300px]"
            alt={photo.url}
          />
          <h1 className="flex gap-2">
            Title:
            <span className="font-bold">
              {updatedTitle ? updatedTitle : photo.title}
            </span>
          </h1>

          {!isEdit ? (
            <button
              className="rounded border-1 outline-none py-1 px-2 bg-blue-500 text-white"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          ) : (
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Enter new title"
                className="border-black border focus:outline-none focus:border-blue-500 rounded-md px-2 py-1"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div>
                <button onClick={() => setIsEdit(false)}>Cancel</button>
                <button type="submit">Update</button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
