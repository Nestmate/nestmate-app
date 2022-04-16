import { Routes,Route } from 'react-router-dom';
import { Signin } from '../pages/auth/Signin';
import { Signup } from '../pages/auth/Signup';
import { ErrorPage } from '../pages/error/ErrorPage';
import { Index } from '../pages/Index';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />}/>
      <Route path="/auth/signup" element={<Signup />}/>
      <Route path="/auth/signin" element={<Signin />}/>
      <Route path="*" element={<ErrorPage />}/>
    </Routes>
  )
}
