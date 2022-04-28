import { Image } from "@mantine/core"
import { useEffect, useState } from "react";
import { uploadImage } from "../../../api/NestmateApi";

export const ImageEdit = ({ image, onChange }) => {

    const [uploadedImage, setUploadedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( async () => {
        if (!uploadedImage) {
            try{
                let formData = new FormData();
                formData.append('file', image);

                const { data } = await uploadImage(formData);
                setUploadedImage(data.file);
                console.log('this is the uploaded image: =>' ,uploadedImage);
                onChange(data.file);

            }catch(err){
                console.log(err);
            }
        }
    },[]);

    return (
        <div>
        {uploadedImage?.path &&<Image
            radius="md"
            src={uploadedImage.path}
            alt="Random unsplash image"
        />}
        </div>
    )
}
