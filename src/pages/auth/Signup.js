import { Link } from "react-router-dom";
import { Container } from "../../components/elements/Container";
import { useReducer, useState } from "react";
import { signUpUser } from "../../api/NestmateApi";

const initialUserFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    loc: {
        type: "Point",
        coordinates: [30.0000,4.000]
    }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "input":
      return { ...state, [action.name]: action.value };
    case "clean":
      return initialUserFormState;
    default:
      return state;
  }
};

export const Signup = () => {
  const [userFormData, dispatch] = useReducer(reducer, initialUserFormState);
  const [error, setError] = useState(null);

  const handleSignUpForm = async (e) => {
    e.preventDefault();
    try {

      const { data } = await signUpUser(userFormData);
      //setSuccess({ status: 200, message: data.message });
    } catch (err) {
      console.log(err);
      setError({ status: 400, message: err.message });
    }
    //dispatch({ type: "clean" });
  };
  const handleInputChange = (e, name, value) => dispatch({ type: "input", name, value });

  return (
    <section className="">
      <article>
        <Container>
          <header>
            <h1>Sign up now</h1>
            <p>
              Already have an account? <Link to="/auth/signin">Sign in</Link>
            </p>
            <form method="post" onSubmit={handleSignUpForm}>
            {error && <p className="text-red-900">{error.message}</p>}
              <fieldset>
                <label htmlFor="firstName">First Name</label>
                <input type="text" placeholder="First name" name="firstName" id="firstName" required value={userFormData.firstName} onChange={(e) => handleInputChange(e, "firstName", e.target.value)  }/>
              </fieldset>
              <fieldset>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" placeholder="Last name" name="lastName" id="lastName" required value={userFormData.lastName} onChange={(e) => handleInputChange(e, "lastName", e.target.value)  }/>
              </fieldset>
              <fieldset>
                <label htmlFor="email">Email</label>
                <input type="email"  placeholder="Email address" name="email" id="email" required value={userFormData.email} onChange={(e) => handleInputChange(e, "email", e.target.value)  }/>
              </fieldset>
              <fieldset>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" name="password" id="password" require value={userFormData.password} onChange={(e) => handleInputChange(e, "password", e.target.value)  }/>
              </fieldset>
              <fieldset>
                <label htmlFor="birthDate">Birth Date</label>
                <input type="date" name="birthDate" id="birthDate" require value={userFormData.birthDate} onChange={(e) => handleInputChange(e, "birthDate", e.target.value)  }/>
              </fieldset>
              <button type="submit" className="button">Sign Up</button>
            </form>
          </header>
        </Container>
      </article>
    </section>
  );
};
