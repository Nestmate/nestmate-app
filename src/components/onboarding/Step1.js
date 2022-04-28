import { DatePicker } from '@mantine/dates';

export const Step1 = ({ newUser, handleInputChange, handleNextStep }) => {

    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleNextStep();
    }

    return (
        <div className="grid grid-cols-1 gap-4 py-6">
            <div className="grid grid-cols-1 gap-4 text-center">
                <h1 className="text-3xl" >Tell us more about yourself</h1>
                <p className="text-xl" >Fill in this information to become a Nestmate member.</p>
            </div>
            <form className="grid grid-cols-1 gap-3" onSubmit={handleOnSubmit}>
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name="firstname" placeholder="First Name" value={newUser.firstname} onChange={(e) => handleInputChange('firstName',e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" name="lastname" placeholder="Last Name" value={newUser.lastname} onChange={(e) => handleInputChange('lastName',e.target.value)} required/>
                </div>
                
                <DatePicker 
                required
                allowFreeInput 
                placeholder="Date of Birth"
                size='md' 
                label="What's your birthday? 🎉" 
                value={newUser.birthDate} 
                onChange={(values) => handleInputChange('birthDate',values)}/>
                
                <button className='button'>Next</button>
            </form>

        </div>
    )

}
