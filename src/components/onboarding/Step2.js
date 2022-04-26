
export const Step2 = ({ newUser,handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 gap-4 py-6">
        <div className="grid grid-cols-1 gap-4 text-center">
            <h1 className="text-3xl" >Tell us more about yourself</h1>
            <p className="text-xl" >Fill in this information to become a Nestmate member and you will find your ideal roommate faster.</p>
        </div>
        <form className="grid grid-cols-1 gap-3">
            <div>
                <label htmlFor="firstname">First Name</label>
                <input type="text" name="firstname" placeholder="First Name" value={newUser.firstname} onChange={(e) => handleInputChange('firstname',e.target.value)}/>
            </div>
            <div>
                <label htmlFor="lastname">Last Name</label>
                <input type="text" name="lastname" placeholder="Last Name" value={newUser.lastname} onChange={(e) => handleInputChange('lastname',e.target.value)}/>
            </div>
            
        </form>

    </div>
  )
}
