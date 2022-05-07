import { DatePicker } from '@mantine/dates';
import { PersonalForm } from '../settings/forms/PersonalForm';

export const Step1 = ({ newUser, handleInputChange, handleNextStep }) => {

    const handleOnSubmit = (e) => {

        e.preventDefault();

        console.log(e)

        //handleNextStep();
    }

    return (
        <div className="grid grid-cols-1 gap-4 py-6">
            <div className="grid grid-cols-1 gap-4 text-center">
                <h1 className="text-3xl" >Tell us more about yourself</h1>
                <p className="text-xl" >Fill in this information to become a Nestmate member.</p>
            </div>

            <PersonalForm onFormUpdated={handleOnSubmit} data={{newUser}}/>

        </div>
    )

}
