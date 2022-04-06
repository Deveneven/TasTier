import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignInScreen from './Screen/SignInScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
