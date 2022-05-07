import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { Container, LoadingOverlay, Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getOnboarding, getSettings, updateOnboarding, updateSettings } from '../../api/NestmateApi';
import { SettingsCardHeader } from '../../components/elements/cards/SettingsCardHeader';
import { CompleteForm } from '../../components/settings/forms/CompleteForm';
import { InterestForm } from '../../components/settings/forms/InterestsForm';
import { MoveForm } from '../../components/settings/forms/MoveForm';
import { PersonalForm } from '../../components/settings/forms/PersonalForm';
import { PicturesForm } from '../../components/settings/forms/PicturesForm';
import { UserContext } from '../../context/user.context';


export const Onboarding = () => {

    const { type } = useParams();
    const navigate = useNavigate()

    const { token, user, storeToken, authenticateUser } = useContext(UserContext);
    const [onBoardingData, setOnboardingData] = useState(null);
    const [onBoardingType, setOnboardingType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ isLoadingData, setIsLoadingData ] = useState(false);

    const setOnboardPage = (type) => {

        switch(type){

            case 'move':
                setOnboardingType({
                    title: 'Where do you want to move?',
                    subtitle: 'We will help you find the best place to move.',
                    form: MoveForm,
                    next: '/auth/onboarding/interests'
                })
                break;
            case 'interests':

                setOnboardingType({
                    title: 'Tell use more about yourself',
                    subtitle: 'What do you like to do? Any cool hobbies?',
                    form: InterestForm,
                    next: '/auth/onboarding/pictures'
                })
                break;
            case 'pictures':
                setOnboardingType({
                    title: 'Pictures',
                    subtitle: 'Keep your pictures up to date',
                    form: PicturesForm,
                    next: '/auth/onboarding/complete'
                })
                break;
            case 'complete':
                setOnboardingType({
                    title: 'Wohoo! You did it!',
                    subtitle: "You're all set. You're ready to go!",
                    form: CompleteForm,
                    next: '/mates'
                })
                break;
            default:
                setOnboardingType({
                    title: 'Personal Information',
                    subtitle: 'Update your personal information to keep your mates in the loop',
                    form: PersonalForm,
                    next: '/auth/onboarding/move'
                })
                break;
        }

    }

    const onFormUpdated = async (info) => {
        try{
            setIsLoadingData(true);
            const { data,status } = await updateOnboarding(info, user._id, token, type);

            if(data.authToken){

                storeToken(data.authToken);

                await authenticateUser();

                showNotification({
                    title: "Welcome back 🎉",
                    color: "green",
                    icon: <CheckIcon />
                });

                return navigate("/mates");
            }

            if(status === 200) return navigate(`${onBoardingType.next}`);

        }catch(err){

            showNotification({
                color: 'red',
                icon: <XIcon  className='icon'/>,
                title: err.message
            });
        }finally{
            setIsLoadingData(false);
        }
    };

    useEffect(() => {

        (async () => {

            if(user && token && type){
                const { data } = await getOnboarding(user._id, token, type);
                console.log(data);
                setOnboardingData(data);
                setOnboardPage(type);
                setLoading(false);
            }

        })();
        
    },[user,type])

    return (

        <section>
            <Container className='max-w-2xl'>
                <div>

                    <Stack spacing='xl'>
                        { loading && <LoadingOverlay /> }
                        { !loading && onBoardingData && onBoardingType && <>
                        
                            <SettingsCardHeader 
                                title={onBoardingType.title} 
                                subtitle={onBoardingType.subtitle} />

                            { onBoardingType.form && <onBoardingType.form onFormUpdated={onFormUpdated} data={onBoardingData} isLoading={ isLoadingData }/> }

                        </> }
                    </Stack>
                </div>
            </Container>
        </section>
        
    )
}
