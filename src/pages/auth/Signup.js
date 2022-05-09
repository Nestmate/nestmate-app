import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/elements/Container";
import { useContext, useReducer, useState } from "react";
import { signUpUser } from "../../api/NestmateApi";
import { showNotification } from "@mantine/notifications";
import { CheckIcon } from "@heroicons/react/solid";
import { PasswordInput, Stack, Text, TextInput, Title, Alert, Button } from "@mantine/core";
import { UserContext } from "../../context/user.context";

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

  const navigate = useNavigate();
  const [userFormData, dispatch] = useReducer(reducer, initialUserFormState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { storeToken, authenticateUser } = useContext(UserContext);

  const handleSignUpForm = async (e) => {
    e.preventDefault();
    try {
      
      setIsLoading(true);
      const { data, status } = await signUpUser(userFormData);
      const { authToken } = data;
      if(authToken){

        storeToken(data.authToken);

        await authenticateUser();

        showNotification({
          title: "Welcome back 🎉",
          color: "green",
          icon: <CheckIcon />
        });

        navigate('/auth/onboarding');

        
      }
      
    } catch (err) {

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
            
                <Title>Sign Up</Title>

                <Text size="lg">Already have an account? <Link to="/auth/signin">Sign in</Link></Text>
            
                <form method="post" onSubmit={handleSignUpForm}>

                  <Stack spacing='md'>

                    {error && <Alert color={'red'}>{error.message}</Alert>}

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
  );
};
