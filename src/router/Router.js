import { Routes,Route } from 'react-router-dom';
import { ErrorPage } from '../pages/error/ErrorPage';
import { Index } from '../pages/Index';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />}/>
      <Route path="*" element={<ErrorPage />}/>
    </Routes>
  )
}
