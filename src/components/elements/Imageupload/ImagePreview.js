import { XIcon } from "@heroicons/react/solid"
import { ActionIcon, Image } from "@mantine/core"


export const ImagePreview = ({image,removeImage}) => {


    
    return (
        <div>
            <ActionIcon onClick={()=> removeImage(image.i)}>
                <XIcon size='sm'/>
            </ActionIcon>
            <Image 
                src={image.path} 
                radius="md"
                height={200}
                fit="cover"
            />    
        </div>
    )

}
