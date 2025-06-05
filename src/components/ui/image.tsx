import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
  className?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  className,
}) => {
  const style: React.CSSProperties = {};

  if (aspectRatio) {
    // This helps reserve space to prevent layout shift
    style.aspectRatio = aspectRatio;
    // If width and height are provided, we can calculate the intrinsic size
    // but for simple aspect ratio, we might just need CSS.
    // We can also set width/height directly on the img tag.
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy" // Enable native lazy loading
      className={className}
      style={style}
    />
  );
};

export default Image;
