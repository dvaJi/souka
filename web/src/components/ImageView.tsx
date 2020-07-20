import * as React from 'react';

interface ImageViewProps {
  image: string;
}

export const ImageView = ({ image }: ImageViewProps) => {
  return <img src={image} />;
};
