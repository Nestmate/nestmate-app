import { Image } from '@mantine/core'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'


export const MateGallery = ({className, images}) => {

    const [refCallback] = useKeenSlider(
        {
            mode: "free",
            slides: { 
                perView: "auto",
                spacing: 10,
            }
        }
    )
    return (
        <div className={className}>
        { images.length > 0 &&
            <div ref={refCallback} className="keen-slider" style={{ overflow: 'visible' }}>
                { images.map(( image ,i) => image?.path && <div className="keen-slider__slide" style={{minWidth: '300px'}} key={i}><Image src={ image?.path } fit="cover" width="auto" height='400px' radius="lg"/></div> ) }
            </div> 
        }
        </div> 

    )
}
