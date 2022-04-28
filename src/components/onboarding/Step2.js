import { DateRangePicker } from "@mantine/dates";
import { LocationBar } from "../elements/search/LocationBar";
import { RangeSlider } from "@mantine/core";

export const Step2 = ({ newUser, handleInputChange, handleNextStep }) => {

    const priceRange = [
        { value: 0, label: '$0' },
        { value: 2000, label: '$2000' },
      ];

    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleNextStep();
    }
    
    return (
        <div className="grid grid-cols-1 gap-4 py-6">
            <div className="grid grid-cols-1 gap-4 text-center">
                <h1 className="text-3xl" >Almost there! A few more things.</h1>
                <p className="text-xl" >This is some sort of subtitle.</p>
            </div>
            <form className="grid grid-cols-1 gap-3" onSubmit={handleOnSubmit}>

                <LocationBar size={'md'} label={'Where do you want to live?'} value={newUser.location} onChange={ ({value,loc}) =>  handleInputChange('loc',{ type: "Point", location: value, coordinates: [loc.lat,loc.lng]})} />
                
                <div className="mb-6">
                    <label htmlFor="moveDateRange">When are you moving?</label>
                    <RangeSlider 
                    required
                    size='md'
                    marks={priceRange} 
                    defaultValue={[0, 2000]} 
                    label={(value) => `$${2000*(value/100)}` }
                    onChange={(values) => handleInputChange('budgetRange',values)}
                    labelAlwaysOn
                    value={newUser.budgetRange} 
                    />
                </div>

                <DateRangePicker 
                size='md'
                required
                label="When are you moving?"
                placeholder="Pick dates range"
                onChange={(values) => handleInputChange('moveDateRange',values)}
                />

                <button className='button'>Next</button>
            </form>

        </div>
    )
}
