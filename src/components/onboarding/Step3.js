import { Textarea } from "@mantine/core";
import { ImageUploader } from "../elements/Imageupload/ImageUploader";


export const Step3 = ({ newUser, handleInputChange, handleNextStep }) => {

    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleNextStep();
    }

    return (
        <div className="grid grid-cols-1 gap-4 py-6">
            <div className="grid grid-cols-1 gap-4 text-center">
                <h1 className="text-3xl" >Final Step</h1>
                <p className="text-xl" >Fill in this information to become a Nestmate member.</p>
            </div>
            <form className="grid grid-cols-1 gap-3" onSubmit={handleOnSubmit}>
            <ImageUploader images={newUser.images} onChange={ ( image ) => handleInputChange('profilePicture', image) }/>
            <Textarea
            placeholder="Hobbies, interests, etc."
            label="Tell us about yourself"
            required
            size="md"
            onChange={(event) => handleInputChange('description',event.target.value)}
            />
                
                
                <button className='button'>Complete!</button>
            </form>

        </div>
    )
}
