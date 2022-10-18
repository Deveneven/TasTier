import React from 'react';
import {useState} from 'react';
import './App.css';
import './scss/style.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignInScreen from './Screen/SignInScreen/SignInScreen';
import RegisterScreen from './Screen/RegisterScreen/RegisterScreen';

import {ThemeProvider} from '@mui/material/styles';
import theme from './MUI styles/mainTheme';
import MainScreen from './Screen/MainScreen/MainScreen';
import ShoppingScreen from './Screen/ShoppingScreen/ShoppingScreen';
import ListScreen from './Screen/ShoppingScreen/ListScreen';
import {ShoppingListDTO} from './Shared/DTOs/ShoppingListDTO';
import RecipeEditScreen from './Screen/RecipeEditScreen/RecipeEditScreen';
function App() {
  // chwilowy useState, przy po��czeniu api zast�pi si�, a edycja listy b�dzie po id listy
  const [lists, setLists] = useState<ShoppingListDTO[]>([
    {
      Id: 1,
      Name: 'Test list with params',
      Friends: [
        {
          Id: 0,
          Name: 'Friend1',
          LastName: 'Test1',
          Nickname: 'testy',
          Avatar: 'T',
          Email: 'test@test.com',
        },
        {
          Id: 1,
          Name: 'Friend2',
          LastName: 'Test2',
          Nickname: 'testy',
          Avatar: 'T',
          Email: 'test@test.com',
        },
      ],
      IngredientsList: [
        {
          Id: 0,
          Name: 'Avocado',
          Calories: 150,
          Allergen: false,
          Amount: 1,
          Unit: 'piece',
        },
        {
          Id: 1,
          Name: 'Apple',
          Calories: 150,
          Allergen: false,
          Amount: 1,
          Unit: 'piece',
        },
        {
          Id: 2,
          Name: 'Water',
          Calories: 0,
          Allergen: false,
          Amount: 100,
          Unit: 'ml',
        },
        {
          Id: 3,
          Name: 'Peanut',
          Calories: 250,
          Allergen: true,
          Amount: 20,
          Unit: 'grams',
        },
      ],
    },
    {Id: 2, Name: 'List title number 2', Friends: [], IngredientsList: []},
    {Id: 3, Name: 'List title number 3', Friends: [], IngredientsList: []},
    {Id: 4, Name: 'List title number 4', Friends: [], IngredientsList: []},
  ]);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/recipe/0" element={<RecipeEditScreen/>} />
          <Route
            path="/shoppinglist"
            element={<ShoppingScreen lists={lists} setLists={setLists} />}
          />
          <Route
            path="/shoppinglist/edit/:id"
            element={<ListScreen lists={lists} />}
          />
          <Route path="/recipe/0" element={<RecipeEditScreen/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
