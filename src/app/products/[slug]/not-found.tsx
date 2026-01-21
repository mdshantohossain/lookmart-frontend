"use client"
import EmptyContent from '@/components/EmptyContent';
import images from '@/utils/images';
import React from 'react'

export default function NotFound() {
  return (
        <EmptyContent
          title="Shopping Cart"
          message="Add some products to get started!"
          image={images.emptyCart}
          buttonText="Continue Shopping"
          href="/"
        />
      );
}
