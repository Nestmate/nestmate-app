import { Routes,Route,useLocation } from 'react-router-dom';
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


export const Router = () => {

  const location = useLocation();

  const state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Index />}/>

        <Route path="/auth/signup" element={<IsAuthenticated><Signup /></IsAuthenticated>}/>
        <Route path="/auth/signin" element={<IsAuthenticated><Signin /></IsAuthenticated>}/>
        <Route path="/auth/onboarding" element={<IsPrivate><IsOnboarded><Onboarding /></IsOnboarded></IsPrivate>}/>
        
        
        <Route path="/profile/settings" element={<IsPrivate><Settings/></IsPrivate>}/>
        <Route path="/profile/settings/:type" element={<IsPrivate><SettingsDetail/></IsPrivate>}/>
        
        <Route path="/mates/" element={<IsPrivate><Mates /></IsPrivate>}/>
        <Route path="/favourites/" element={<IsPrivate><Favourites /></IsPrivate>}/>
        <Route path="/mates/:username" element={<Mate />}/>
        <Route path="/mates/location/:lat/:lng" element={<SearchMates />}/>

        <Route path="*" element={<ErrorPage />}/>

      </Routes>

      {/* Show the modal when a `backgroundLocation` is set */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/mates/:username" element={<ModalPage><MateDetail /></ModalPage>} />
        </Routes>
      )}

    </>
  )
}
