import { Button, Grid, Image, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { uploadImage } from "../../../api/NestmateApi";
import { InterestSelect } from "../../elements/form/InterestSelect";
import { ImageDropZone } from "../../elements/Imageupload/ImageDropZone";
import { ImagePreview } from "../../elements/Imageupload/ImagePreview";

export const PicturesForm = ({ data, onFormUpdated, isLoading }) => {


    const [images, setImages] = useState([]);
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {

        setProfilePicture(data.profilePicture);
        setImages(data.images);

    },[])

    const updateProfilePicture = () => setProfilePicture(images[0]);

    const onImageSelectHandler = (files) => {
            
            console.log(files);

            if(files){
                const reader = new FileReader();
                files.map(file => {
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        setImages([...images, { path:reader.result, file }]);
                    }
                })
            }

            updateProfilePicture();
    }

    const onImageRemoveHandler = (i) => {

        const newImages = images.filter((image, index) => index !== i);
        setImages(newImages);
        updateProfilePicture();
    }

    const onSubmitHandler = async (e) => {

        e.preventDefault();

        try{

            let formData;

            const promises = images.map( async ({file}) => { console.log(file); 
                formData = new FormData();
                formData.append("file", file);
                return await uploadImage(formData);
            } );

            const res = await Promise.all(promises);

            const newImages = res.map(({data}) => data.file);

            onFormUpdated({
                images:newImages,
                profilePicture: newImages[0]
            });

        }catch(err){

            console.log(err);

        }

    }

    return (
        <form onSubmit={onSubmitHandler}>
            <Stack spacing='xl'>
                <SimpleGrid cols={3}>
                    {images?.length > 0 && images.map( (image, i) => <ImagePreview key={i} image={{...image,i}} removeImage={onImageRemoveHandler}/> )}
                    <ImageDropZone onDrop={onImageSelectHandler} />
                </SimpleGrid>
                <Button type="submit" size="md" fullWidth loading={isLoading}>Update</Button>
            </Stack>
        </form>
    )
}
