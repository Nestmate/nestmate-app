import { useState,useReducer,useContext, useEffect } from 'react';
import { Stepper, Group } from '@mantine/core';
import { Container } from '../../components/elements/Container';
import { Step1 } from '../../components/onboarding/Step1';
import { StyledStepper } from '../../components/elements/StyledStepper';
import { UserContext } from '../../context/user.context';
import { Step2 } from '../../components/onboarding/Step2';
import { Step3 } from '../../components/onboarding/Step3';
import { useNavigate } from 'react-router-dom';
import { onBoardUser } from '../../api/NestmateApi';

const newUserState = {
    _id: "",
    firstName: "",
    lastName: "",
    birthDate: null,
    description: "",
    profilePicture: "String",
    images: [],
    loc: {
        type: "Point",
        location: "",
        coordinates: []
    },
    budgetRange: null,
    moveDateRange: null
};


const reducer = (state, action) => {

    switch (action.type) {
        case "input":
        return { ...state, [action.name]: action.value };
        case "init":
        return action.data
        default:
        return state;
    }
};

export const Onboarding = () => {
    const navigate = useNavigate();
    const { user,storeToken,authenticateUser } = useContext(UserContext);

    const [newUser, dispatch] = useReducer(reducer, newUserState);
    const [active, setActive] = useState(0);

    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handleInputChange = (name, value) => dispatch({ type: "input", name , value });

    const onCompleteOnboarding = async () => {
        try {
            
            const { data } = await onBoardUser(newUser);
            storeToken(data.authToken);
            await authenticateUser();
            navigate("/");

        }catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        
        handleInputChange('_id',user._id);
        console.log(newUser);

    },[user]);


    return (
        <>
            <section>
                <Container size='sm'>
                    <StyledStepper active={active} onStepClick={setActive}>

                        <Stepper.Step>
                            <Step1 newUser={newUser} handleInputChange={handleInputChange} handleNextStep={nextStep}/>
                        </Stepper.Step>

                        <Stepper.Step>
                            <Step2 newUser={newUser} handleInputChange={handleInputChange} handleNextStep={nextStep}/>
                        </Stepper.Step>

                        <Stepper.Step>
                            <Step3 newUser={newUser} handleInputChange={handleInputChange} handleNextStep={onCompleteOnboarding}/>
                        </Stepper.Step>

                        <Stepper.Completed>
                            Completed
                        </Stepper.Completed>

                    </StyledStepper>

                    <Group position="center" mt="xl">
                        <button className="button-light" onClick={prevStep}>Back</button>
                    </Group>
                </Container>
            </section>
        </>
    );
}