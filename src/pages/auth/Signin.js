import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/elements/Container";
import { useReducer, useState } from "react";
import { signInUser } from "../../api/NestmateApi";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import { Alert, Button, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { CheckIcon } from "@heroicons/react/solid";
import { showNotification } from "@mantine/notifications";

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
  const [isLoading, setIsLoading] = useState(false);

  const { storeToken, authenticateUser } = useContext(UserContext);

  const handleSignInForm = async (e) => {

    e.preventDefault();

    setIsLoading(true);

    try {

      const { data } = await signInUser(userFormData);

      storeToken(data.authToken);

      await authenticateUser();

      showNotification({
        title: "Welcome back 🎉",
        color: "green",
        icon: <CheckIcon />
      });

      navigate("/mates");

    } catch (err) {
      console.log(err);
      setError({ status: 400, message: err.message });
    }finally{
      setIsLoading(false);
    }
    //dispatch({ type: "clean" });
  };
  const handleInputChange = (e, name, value) => dispatch({ type: "input", name, value });

  return (
    <section className="">
      <article>
        <Container size="sm">
          <Stack spacing='md'>

              <Title>Sign In</Title>

              <Text size="lg">Don't have an account? <Link to="/auth/signup">Sign up</Link></Text>
          
              <form method="post" onSubmit={handleSignInForm}>
                <Stack spacing='md'>
                  {error && <Alert color='red'>{error.message}</Alert>}

                    <TextInput
                      placeholder="Your Email"
                      label="Email address"
                      value={userFormData.email} 
                      size="md"
                      onChange={(e) => handleInputChange(e, "email", e.target.value)  }
                      required
                    />

                    <PasswordInput
                        placeholder="Password"
                        label="Password"
                        value={userFormData.password}
                        onChange={(e) => handleInputChange(e, "password", e.target.value) }
                        required
                        size="md"
                      />
                      
                    <Button type="submit" size="lg" loading={isLoading}>Sign In</Button>
                  </Stack>
              </form>

          </Stack>
        </Container>
      </article>
    </section>
  )
}
