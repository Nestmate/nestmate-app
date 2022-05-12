import { Button, Grid, Image, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { uploadImage } from "../../../api/NestmateApi";
import { InterestSelect } from "../../elements/form/InterestSelect";
import { ImageDropZone } from "../../elements/Imageupload/ImageDropZone";
import { ImagePreview } from "../../elements/Imageupload/ImagePreview";

export const PicturesForm = ({ data, onFormUpdated, isLoading }) => {


    const [ images, setImages ] = useState([]);
    const [ newImages, setNewImages ] = useState([]);
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(false);

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
                        setNewImages([...newImages, { path:reader.result, file }]);
                    }
                })
            }

            updateProfilePicture();
    }

    const onImageRemoveHandler = (i,type) => {
        
        switch(type){
            case 'old':
                const newImages = images.filter((image, index) => index !== i);
                setImages(newImages);
                break;
            default:
                const newNewImages = newImages.filter((image, index) => index !== i);
                setNewImages(newNewImages);
                break;
        }
        //updateProfilePicture();
        console.log({ images, newImages });
    }

    const onSubmitHandler = async (e) => {

        e.preventDefault();

        try{
            setLoading(true);
            let formData;

            const promises = newImages.map( async ({file}) => { console.log(file); 
                formData = new FormData();
                formData.append("file", file);
                return await uploadImage(formData);
            } );

            const res = await Promise.all(promises);

            const uploadedImages = res.map(({data}) => data.file);
            const uploadImages = [...images, ...uploadedImages]

            onFormUpdated({
                images: uploadImages,
                profilePicture: uploadImages[0]
            });

        }catch(err){

            console.log(err);

        }finally {
                
            setLoading(false);
        }

    }

    return (
        <form onSubmit={onSubmitHandler}>
            <Stack spacing='xl'>
                <SimpleGrid cols={3}>
                    {images?.length > 0 && images.map( (image, i) => <ImagePreview key={i} image={{...image,i}} removeImage={ i => onImageRemoveHandler(i,'old')}/> )}
                    {newImages?.length > 0 && newImages.map( (image, i) => <ImagePreview key={i} image={{...image,i}} removeImage={ i => onImageRemoveHandler(i,'new')}/> )}
                    <ImageDropZone onDrop={onImageSelectHandler} />
                </SimpleGrid>
                <Button type="submit" size="md" fullWidth loading={isLoading || loading}>Update</Button>
            </Stack>
        </form>
    )
}
