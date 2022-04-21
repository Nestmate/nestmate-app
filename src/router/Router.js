import { Routes,Route } from 'react-router-dom';
import { Signin } from '../pages/auth/Signin';
import { Signup } from '../pages/auth/Signup';
import { ErrorPage } from '../pages/error/ErrorPage';
import { Index } from '../pages/Index';
import { isPrivate } from '../components/elements/isPrivate';
import { Mates } from '../pages/mates/Mates';
import { Mate } from '../pages/mates/Mate';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />}/>
      <Route path="/auth/signup" element={<Signup />}/>
      <Route path="/auth/signin" element={<Signin />}/>
      <Route path="/mates/" element={<isPrivate><Mates /></isPrivate>}/>
      <Route path="/mates/:id" element={<isPrivate><Mate /></isPrivate>}/>
      <Route path="*" element={<ErrorPage />}/>
    </Routes>
  )
}
