import { RoomMate } from "./RoomMate"
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module


export const RoomMates = ({roommates}) => { 

    const [refCallback] = useKeenSlider(
        {
            breakpoints: {
                '(min-width: 300px)': {
                    slides: {
                        perView: 1.2,
                        spacing: 10,
                    },
                },
                '(min-width: 768px)': {
                    slides: {
                        perView: 3,
                        spacing: 10,
                    },
                },
                '(min-width: 1024px)': {
                    slides: {
                        perView: 5,
                        spacing: 20,
                    },
                },
            },
        }
    )
    
    return(
        <div ref={refCallback} className="keen-slider grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3" style={{overflow:'visible'}}>
            {roommates.length && roommates.map(roommate => <div className="keen-slider__slide"><RoomMate roommate={roommate} /></div>)}
            {!roommates.length && <h3 className="text-center text-slate-600 font-normal text-xl">No Roommates to show 😢</h3>}
        </div>
    )
}