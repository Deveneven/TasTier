import React from 'react';
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
import RecipeEditScreen from './Screen/RecipeEditScreen/RecipeEditScreen';
import SettingsScreen from './Screen/SettingsScreen/SettingsScreen';
import DietSettingsScreen from './Screen/DietSettingsScreen/DietSettingsScreen';
import {UserProvider} from './Contexts/UserContext';
import PrivateRoute from './Utils/PrivateRoute';
import MyRecipesScreen from './Screen/MyRecipesScreen/MyRecipesScreen';
function App() {
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
              element={<ShoppingScreen />}
            />
            <Route
              path="/shoppinglist/edit/:id"
              element={<ListScreen />}
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
