import React from 'react';
import './App.css';
import './scss/style.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignInScreen from './Screen/SignInScreen';
import RegisterPopOut from './Shared/RegisterPopOut/RegisterPopOut';
import {ThemeProvider} from '@mui/material/styles';
import theme from './MUI styles/mainTheme';
import Navbar from './Shared/Navbar/Navbar';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInScreen />} />
          <Route path="/register" element={<RegisterPopOut />} />
          <Route path="/test" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
