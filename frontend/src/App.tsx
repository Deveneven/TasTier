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
import {ShoppingListDTO} from './Shared/DTOs/ShoppingListDTO';
function App() {
  // chwilowy useState, przy połączeniu api zastąpi się, a edycja listy będzie po id listy
  const [lists, setLists] = useState<ShoppingListDTO[]>([
    {Id: 1, Name: 'List title number 1', Friends: []},
    {Id: 2, Name: 'List title number 2', Friends: []},
    {Id: 3, Name: 'List title number 3', Friends: []},
    {Id: 4, Name: 'List title number 4', Friends: []},
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
