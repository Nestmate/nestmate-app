import { XIcon } from "@heroicons/react/solid"
import { ActionIcon, Image } from "@mantine/core"


export const ImagePreview = ({image,removeImage}) => {
    
    return (
        <div className="relative">
            <ActionIcon onClick={()=> removeImage(image.i)} className="absolute top-2 right-2 z-10" variant="light">
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
