import { Dropzone } from "@mantine/dropzone"
import { ImageDropZone } from "./ImageDropZone"
import { Button } from '@mantine/core';
import { FullScreenDropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useState } from "react";
import { ImageEdit } from "./ImageEdit";

export const ImageUploader = ({onChange}) => {
  
  const [currentImages, setCurrentImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const onImageDropHandler = (files) => {
    setCurrentImages(files);
    console.log(currentImages);
  }

  const onHandleImagesLoaded = (image) => onChange(image);

  return (
      <div className="grid grid-cols-1 gap-6">
        {currentImages.length > 0 && currentImages.map((image, i) => <ImageEdit key={i} image={image} onChange={(image) => onHandleImagesLoaded(image)}/> )}
        {currentImages.length === 0 && <ImageDropZone onDrop={(files) => onImageDropHandler(files)}/> }
      </div>
  )
}
