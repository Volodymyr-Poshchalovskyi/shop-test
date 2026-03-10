// src/Routes/Router.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import PrivacyPolicy from '../Pages/PrivacyPolicy';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}