import images from '@/utils/images'
import Image from 'next/image'
import React from 'react'

export default function AddSection() {
  return (
      <div
        className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible scrollbar-hide mb-16 pb-4 justify-start md:justify-center"
      >
        {/* Headphone Card */}
        <div className="flex-shrink-0 min-w-[280px] sm:min-w-[320px] bg-pink-200 rounded-2xl p-6 sm:p-8 flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-xs sm:text-sm mb-1">Headphone</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Music
            </h2>
            <button className="text-red-500 text-xs sm:text-sm font-medium hover:underline">
              View Collection
            </button>
          </div>
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 ">
            <Image
              src={images.emptyImage}
              alt="Headphones"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Camera Card */}
        <div className="flex-shrink-0 min-w-[280px] sm:min-w-[320px] bg-cyan-100 rounded-2xl p-6 sm:p-8 flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-xs sm:text-sm mb-1">
              Up to 35% OFF
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Camera
            </h2>
            <button className="text-red-500 text-xs sm:text-sm font-medium hover:underline">
              Show Now
            </button>
          </div>
          <div className="relative w-20 h-20 sm:w-28 sm:h-28  relative flex-shrink-0">
            <Image
              src={images.emptyImage}
              alt="Camera"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Watch Card */}
        <div className="flex-shrink-0 min-w-[280px] sm:min-w-[320px] bg-orange-200 rounded-2xl p-6 sm:p-8 flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-xs sm:text-sm mb-1">
              Sale Offer 20% OFF This Week
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Watch
            </h2>
            <button className="text-red-500 text-xs sm:text-sm font-medium hover:underline">
              View Collection
            </button>
          </div>
          <div className="relative w-20 h-20 sm:w-28 sm:h-28  relative flex-shrink-0">
            <Image
              src={images.emptyImage}
              alt="Watch"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
  )
}
