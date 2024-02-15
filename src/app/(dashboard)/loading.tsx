"use client"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="animate-spin size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

