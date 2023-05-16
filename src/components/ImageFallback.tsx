import { SyntheticEvent, useEffect, useState } from "react";

interface Props {
  images: string[] | undefined;
  altText: string;
}

const ImageFallback = ({ images, altText }: Props) => {
  const [currImg, setCurrImg] = useState("");
  let imagesAvail = new Set<string>();

  const useImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    let updatedImagesAvail = new Set(imagesAvail);
    let iterator = updatedImagesAvail.values();
    let brokenImg = iterator.next().value;
    let updatedImg = iterator.next().value;
    updatedImagesAvail.delete(brokenImg);

    imagesAvail = updatedImagesAvail;
    event.currentTarget.src = updatedImg;
  };

  useEffect(() => {
    if (images) {
      let updatedImagesAvail = new Set(imagesAvail);
      images.forEach((image) => {
        updatedImagesAvail.add(image);
      });

      let iterator = updatedImagesAvail.values();
      let first = iterator.next().value;

      setCurrImg(first);
      imagesAvail = updatedImagesAvail;
    }
  });

  return (
    <>
      {currImg && (
        <img src={`"${currImg}"`} onError={useImageFallback} alt={altText} />
      )}
    </>
  );
};

export default ImageFallback;
