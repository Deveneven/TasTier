import React from 'react';
import './App.css';
import './scss/style.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignInScreen from './Screen/SignInScreen/SignInScreen';
import {ThemeProvider} from '@mui/material/styles';
import theme from './MUI styles/mainTheme';
import MainScreen from './Screen/MainScreen/MainScreen';
import Navbar from './Shared/Components/Navbar/Navbar';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/" element={<SignInScreen />} />
          <Route path="/test" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
