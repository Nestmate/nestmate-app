import { Routes,Route } from 'react-router-dom';
import { Signin } from '../pages/auth/Signin';
import { Signup } from '../pages/auth/Signup';
import { ErrorPage } from '../pages/error/ErrorPage';
import { Index } from '../pages/Index';
import { IsPrivate } from '../components/elements/IsPrivate';
import { Mates } from '../pages/mates/Mates';
import { Mate } from '../pages/mates/Mate';
import { SearchMates } from '../pages/mates/SearchMates';
import { Onboarding } from '../pages/auth/Onboarding';
import { Favourites } from '../pages/favourites.js/Favourites';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />}/>

      <Route path="/auth/signup" element={<Signup />}/>
      <Route path="/auth/signin" element={<Signin />}/>
      <Route path="/auth/onboarding" element={<IsPrivate><Onboarding /></IsPrivate>}/>

      <Route path="/mates/" element={<IsPrivate><Mates /></IsPrivate>}/>
      <Route path="/favourites/" element={<IsPrivate><Favourites /></IsPrivate>}/>
      <Route path="/mates/:username" element={<Mate />}/>
      <Route path="/mates/location/:lat/:lng" element={<SearchMates />}/>

      <Route path="*" element={<ErrorPage />}/>

    </Routes>
  )
}
