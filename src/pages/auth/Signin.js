import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/elements/Container";
import { useReducer, useState } from "react";
import { signInUser } from "../../api/NestmateApi";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";

const initialUserFormState = {
    email: "",
    password: ""
}

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


export const Signin = () => {

  const navigate = useNavigate();

  const [userFormData, dispatch] = useReducer(reducer, initialUserFormState);
  const [error, setError] = useState(null);

  const { storeToken, authenticateUser } = useContext(UserContext);

  const handleSignInForm = async (e) => {
    e.preventDefault();
    try {

      const { data } = await signInUser(userFormData);
      storeToken(data.authToken);
      await authenticateUser();
      navigate("/mates");
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
        <Container size="sm">
          <header>
            <h1>Sign in</h1>
            <p>
              Don't have an account? <Link to="/auth/signup">Sign up</Link>
            </p>
            <form method="post" onSubmit={handleSignInForm}>
            {error && <p className="text-red-900">{error.message}</p>}
              <fieldset>
                <label htmlFor="emmail">Email</label>
                <input type="email" placeholder="Email" name="email" id="email" required value={userFormData.email} onChange={(e) => handleInputChange(e, "email", e.target.value)  }/>
              </fieldset>
              <fieldset>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" name="password" id="password" require value={userFormData.password} onChange={(e) => handleInputChange(e, "password", e.target.value)  }/>
              </fieldset>
              <button type="submit" className="button">Sign In</button>
            </form>
          </header>
        </Container>
      </article>
    </section>
  )
}
