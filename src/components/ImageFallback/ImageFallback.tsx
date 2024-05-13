import { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  images: string[] | undefined;
  altText: string;
}

const ImgWithAltText = styled.img`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function ImageFallback({ images, altText, ...props }: Props) {
  const [currImg, setCurrImg] = useState<string>();
  const defaultImagesAvail = images ? images : [];
  const [imagesAvail, setImagesAvail] = useState<string[]>(defaultImagesAvail);

  const useImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (imagesAvail.length <= 1) {
      event.currentTarget.onerror = null;
      return;
    }

    const updatedImagesAvail = imagesAvail.slice(1);
    setImagesAvail(updatedImagesAvail);

    event.currentTarget.src = updatedImagesAvail[0];
  };

  useEffect(() => {
    if (images && images.length > 0) {
      setCurrImg(images[0]);
    }
  }, []);

  return (
    <>
      {currImg && (
        <ImgWithAltText
          src={`${currImg}`}
          onError={useImageFallback}
          alt={altText}
          {...props}
        />
      )}
    </>
  );
}

export default ImageFallback;
