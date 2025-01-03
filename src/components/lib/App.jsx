import '../lib/App.css'

import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from 'react-router-dom';
import Home from '../ui/jsx/home'
import Login from '../ui/jsx/login'
import Signup from '../ui/jsx/register'
import Profile from '../ui/jsx/profile';



export default function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} /> 
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
 
  );

}



