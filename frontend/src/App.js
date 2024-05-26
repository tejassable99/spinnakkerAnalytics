
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import AddContact from './components/AddContact';

import GlobalContacts from './components/GlobalContacts';
import VerifyOTP from './components/Auth/VerifyOTP';


const App = () => {
  return (
    
      <Routes>
        <Route  path="/Register" element={<Register/>} />
        <Route  path="/" element={<Login/>} />
        <Route  path="/verifyOtp" element={<VerifyOTP/>} />
        <Route path='/AddContact' element={<AddContact/>}/>
        
        <Route path='/GlobalContacts' element={<GlobalContacts/>}/>
      </Routes>

  );
};

export default App;
