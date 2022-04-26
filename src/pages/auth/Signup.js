import { Link } from "react-router-dom";
import { Container } from "../../components/elements/Container";
import { useReducer, useState } from "react";
import { signUpUser } from "../../api/NestmateApi";

const initialUserFormState = {
    email: "",
    password: ""
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
      console.log(err.message);
      setError({ status: 400, message: err.message });
    }
    //dispatch({ type: "clean" });
  };
  const handleInputChange = (e, name, value) => dispatch({ type: "input", name, value });

  return (
    <section className="">
      <article>
        <Container size="sm">
        <div className="grid grid-cols-1 gap-6">
          <header className="text-center grid grid-cols-1 gap-4">
              <h1>Sign up now</h1>
              <p>
                Already have an account? <Link to="/auth/signin">Sign in</Link>
              </p>
            </header>
            <form method="post" onSubmit={handleSignUpForm} className="grid grid-cols-1 gap-4">
            {error && <p className="text-red-900">{error.message}</p>}
              <fieldset>
                <label htmlFor="email">Email</label>
                <input type="email"  placeholder="Email address" name="email" id="email" required value={userFormData.email} onChange={(e) => handleInputChange(e, "email", e.target.value)  }/>
              </fieldset>
              <fieldset>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" name="password" id="password" require value={userFormData.password} onChange={(e) => handleInputChange(e, "password", e.target.value)  }/>
              </fieldset>
              <button type="submit" className="button">Sign Up</button>
            </form>
        </div>
          
        </Container>
      </article>
    </section>
  );
};
