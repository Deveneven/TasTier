import React from 'react';
import {useState} from 'react';
import './App.css';
import './scss/style.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignInScreen from './Screen/SignInScreen/SignInScreen';
import {ThemeProvider} from '@mui/material/styles';
import theme from './MUI styles/mainTheme';
import MainScreen from './Screen/MainScreen/MainScreen';
import ShoppingScreen from './Screen/ShoppingScreen/ShoppingScreen';
import ListScreen from './Screen/ShoppingScreen/ListScreen';
function App() {
  // chwilowy useState, przy połączeniu api zastąpi się, a edycja listy będzie po id listy
  const [lists, setLists] = useState([
    {id: 1, name: 'List title number 1', friends: {}},
    {id: 2, name: 'List title number 2', friends: {}},
    {id: 3, name: 'List title number 3', friends: {}},
    {id: 4, name: 'List title number 4', friends: {}},
  ]);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/" element={<SignInScreen />} />
          <Route
            path="/shoppinglist"
            element={<ShoppingScreen lists={lists} setLists={setLists} />}
          />
          <Route
            path="/shoppinglist/edit/:id"
            element={<ListScreen lists={lists} setLists={setLists} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
