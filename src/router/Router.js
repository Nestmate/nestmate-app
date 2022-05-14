import { Routes,Route,useLocation, Navigate } from 'react-router-dom';
import { Signin } from '../pages/auth/Signin';
import { Signup } from '../pages/auth/Signup';
import { ErrorPage } from '../pages/error/ErrorPage';
import { Index } from '../pages/Index';
import { Mates } from '../pages/mates/Mates';
import { Mate } from '../pages/mates/Mate';
import { SearchMates } from '../pages/mates/SearchMates';
import { Onboarding } from '../pages/auth/Onboarding';
import { Favourites } from '../pages/favourites/Favourites';
import { ModalPage } from '../components/modals/ModalPage';
import { MateDetail } from '../components/mates/mate/MateDetail';
import { IsOnboarded } from '../middlewares/IsOnboarded';
import { IsAuthenticated } from '../middlewares/IsAuthenticated';
import { IsPrivate } from '../middlewares/IsPrivate';
import { Settings } from '../pages/settings/Settings';
import { SettingsDetail } from '../pages/settings/SettingsDetail';
import { Chats } from '../pages/chats/Chats';
import { NewChat } from '../pages/chats/NewChat';
import { Notifications } from '../pages/notifications/Notifications';
import { Connection } from '../pages/connections/Connection';


export const Router = () => {

  const location = useLocation();

  const state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Index />}/>

        <Route path="/auth/signup" element={<IsAuthenticated><Signup /></IsAuthenticated>}/>
        <Route path="/auth/signin" element={<IsAuthenticated><Signin /></IsAuthenticated>}/>

        <Route path="/auth/onboarding/" element={ <Navigate to="/auth/onboarding/personal"/> } />
        <Route path="/auth/onboarding/:type" element={<IsOnboarded><Onboarding /></IsOnboarded>}/>
        
        <Route path="/profile/settings" element={<IsPrivate><Settings/></IsPrivate>}/>
        <Route path="/profile/settings/:type" element={<IsPrivate><SettingsDetail/></IsPrivate>}/>

        <Route path="/chats" element={<IsPrivate><Chats /></IsPrivate>} />
        <Route path="/chats/:chatId" element={<IsPrivate><Chats /></IsPrivate>} />
        <Route path="/chat/new" element={<IsPrivate><NewChat /></IsPrivate>} />

        <Route path="/profile/notifications" element={<IsPrivate><Notifications/></IsPrivate>}/>
        
        <Route path="/mates/" element={<IsPrivate><Mates /></IsPrivate>}/>
        <Route path="/favourites/" element={<IsPrivate><Favourites /></IsPrivate>}/>
        <Route path="/mates/:username" element={<Mate />}/>
        <Route path="/mates/location/:lat/:lng" element={<SearchMates />}/>

        <Route path="*" element={<ErrorPage />}/>

      </Routes>

      {/* Show the modal when a `backgroundLocation` is set */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/mates/:username" element={<ModalPage size={'100%'}><MateDetail /></ModalPage>} />
          <Route path="/chat/new/" element={<IsPrivate><ModalPage size={'lg'}><NewChat /></ModalPage></IsPrivate>} />
          <Route path="/connection/:conId" element={<IsPrivate><ModalPage size={'md'}><Connection /></ModalPage></IsPrivate>} />
        </Routes>
      )}

    </>
  )
}
