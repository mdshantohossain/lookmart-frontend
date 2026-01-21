"use client"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="z-50 absolute w-full h-full bg-background/70  inset-0 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  );
}                        