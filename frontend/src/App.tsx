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
import SettingsScreen from './Screen/SettingsScreen/SettingsScreen';
import DietSettingsScreen from './Screen/DietSettingsScreen/DietSettingsScreen';
import {UserProvider} from './Contexts/UserContext';
import PrivateRoute from './Utils/PrivateRoute';
import MyRecipesScreen from './Screen/MyRecipesScreen/MyRecipesScreen';
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
          id: 0,
          name: 'Avocado',
          calories: 150,
          allergen: false,
          amount: 1,
          unit: 2,
        },
        {
          id: 1,
          name: 'Apple',
          calories: 150,
          allergen: false,
          amount: 1,
          unit: 2,
        },
        {
          id: 2,
          name: 'Water',
          calories: 0,
          allergen: false,
          amount: 100,
          unit: 2,
        },
        {
          id: 3,
          name: 'Peanut',
          calories: 250,
          allergen: true,
          amount: 20,
          unit: 1,
        },
      ],
    },
    {Id: 2, Name: 'List title number 2', Friends: [], IngredientsList: []},
    {Id: 3, Name: 'List title number 3', Friends: [], IngredientsList: []},
    {Id: 4, Name: 'List title number 4', Friends: [], IngredientsList: []},
  ]);
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route
              path="/shoppinglist"
              element={<ShoppingScreen lists={lists} setLists={setLists} />}
            />
            <Route
              path="/shoppinglist/edit/:id"
              element={<ListScreen lists={lists} />}
            />
            <Route path="/recipe/0" element={<RecipeEditScreen/>} />
            <Route path="/recipe/:id" element={<PrivateRoute outlet={<RecipeEditScreen />} />} />
            <Route path="/account/settings" element={<SettingsScreen/>} />
            <Route path="/diets" element={<DietSettingsScreen/>} />
            <Route path="/myrecipes" element={<MyRecipesScreen/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
