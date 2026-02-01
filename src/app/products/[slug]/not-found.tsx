"use client"
import EmptyContent from '@/components/EmptyContent';
import images from '@/utils/images';
import React from 'react'

export default function NotFound() {
  return (
        <EmptyContent
          title="404 | Not Found"
          message="Provided slug is incorrect. Don't motified it."
          image={images.emptyCart}
          buttonText="Go To Home"
          href="/"
        />
      );
}
