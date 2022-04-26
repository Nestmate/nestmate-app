import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'


export const MateGallery = ({className}) => {

    const [refCallback] = useKeenSlider(
        {
            breakpoints: {
                '(min-width: 300px)': {
                    slides: {
                        origin: "center",
                        perView: 1,
                        spacing: 5,
                    },
                },
                '(min-width: 768px)': {
                    slides: {
                        origin: "auto",
                        perView: 2,
                        spacing: 20,
                    },
                },
            },
        }
    )
    return (
        <div className={className}>
            <div ref={refCallback} className="keen-slider grid grid-cols-1 md:grid-cols-3 gap-3" style={{ overflow: 'visible' }}>
                { ['image','image','image','image'].map((image,i) => <div className="keen-slider__slide" key={i}><img src="https://picsum.photos/400/420" className="rounded-lg w-full"/></div>) }
            </div>
        </div>
    )
}
