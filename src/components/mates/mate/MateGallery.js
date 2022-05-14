import { Image } from '@mantine/core'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'


export const MateGallery = ({className, images}) => {

    const [refCallback] = useKeenSlider(
        {
            mode: "free",
            breakpoints: {
                "(min-width: 400px)": {
                    slides: { perView: 1.5, spacing: 20 },
                },
                "(min-width: 1000px)": {
                    slides: { perView: 3, spacing: 20 },
                },
            },
            slides: { perView: 1 },
        }
    )
    return (
        <div className={className}>
        { images.length > 0 &&
            <div ref={refCallback} className="keen-slider w-full" style={{ minWidth: '100% !important', maxWidth: '100% !important'}}>
                { images.map(( image ,i) => image?.path && <div className="keen-slider__slide" key={i}><Image src={ image?.path } fit="cover" width="100%" height='320px' radius="lg"/></div> ) }
            </div> 
        }
        </div> 

    )
}
