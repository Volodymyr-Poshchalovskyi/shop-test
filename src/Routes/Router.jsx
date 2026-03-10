// src/routes/router.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Contact from '../Pages/Contact';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
