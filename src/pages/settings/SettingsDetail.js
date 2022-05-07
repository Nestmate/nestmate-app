import { ArrowLeftIcon, CheckIcon, XIcon } from '@heroicons/react/solid';
import { Container, LoadingOverlay, Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSettings, updateSettings } from '../../api/NestmateApi';
import { SettingsCardHeader } from '../../components/elements/cards/SettingsCardHeader';
import { InterestForm } from '../../components/settings/forms/InterestsForm';
import { MoveForm } from '../../components/settings/forms/MoveForm';
import { PersonalForm } from '../../components/settings/forms/PersonalForm';
import { PicturesForm } from '../../components/settings/forms/PicturesForm';
import { UserContext } from '../../context/user.context';


export const SettingsDetail = () => {

    const { type } = useParams();
    const navigate = useNavigate()

    const { token, user } = useContext(UserContext);
    const [settingsData, setSettingsData] = useState(null);
    const [settingType, setSettingType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ isLoadingData, setIsLoadingData ] = useState(false);

    const setSettingsPage = (type) => {

        switch(type){
            case 'personal':
                setSettingType({
                    title: 'Personal Information',
                    subtitle: 'Update your personal information to keep your mates in the loop',
                    form: PersonalForm
                })
                break;

            case 'interests':

                setSettingType({
                    title: 'Interests',
                    subtitle: 'Update your interests to keep your mates in the loop',
                    form: InterestForm
                })
                break;

            case 'move':

                setSettingType({
                    title: 'Location & Buget settings.',
                    subtitle: 'Update your location and budget.',
                    form: MoveForm
                })
                break;

            case 'pictures':
                setSettingType({
                    title: 'Pictures',
                    subtitle: 'Keep your pictures up to date',
                    form: PicturesForm
                })
                break;

            default:
                navigate(-1);
                break;
        }

    }

    const onFormUpdated = async (info) => {
        try{
            setIsLoadingData(true);
            const { data,status } = await updateSettings(info, user._id, token, type);

            showNotification({
                color: status === 200 ? 'green' : 'red',
                icon: status === 200 ? <CheckIcon className='icon'/> : <XIcon  className='icon'/>,
                title: data.message
            });

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
                const { data } = await getSettings(user._id, token, type);
                console.log(data);
                setSettingsData(data);
                setSettingsPage(type);
                setLoading(false);
            }

        })();
        
    },[])

    return (

        <section>
            <Container className='max-w-2xl'>
                <div>
                    
                    <Link to='/profile/settings/' className='inline-flex gap-1 items-center py-3 mb-3 nav-link'><ArrowLeftIcon className='icon'></ArrowLeftIcon> Settings</Link>
                    <Stack spacing='xl'>
                        { loading && <LoadingOverlay /> }
                        { settingsData && settingType && <>
                        
                            <SettingsCardHeader 
                                title={settingType.title} 
                                subtitle={settingType.subtitle} />

                            <settingType.form onFormUpdated={onFormUpdated} data={settingsData} isLoading={isLoadingData}/>

                        </> }
                    </Stack>
                </div>
            </Container>
        </section>
        
    )
}
