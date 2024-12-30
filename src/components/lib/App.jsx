import '../lib/App.css'

import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from 'react-router-dom';
import Home from '../ui/jsx/home'
import Login from '../ui/jsx/login'
import Signup from '../ui/jsx/register'



function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
</Routes>
  );

}

export default App
