import React from 'react';
import ShoppingList from './ShoppingList/ShoppingList';
import Navbar from '../../Shared/Components/Navbar/Navbar';
import {ShoppingListDTO} from '../../Shared/DTOs/ShoppingListDTO';

type ShoppingScreenProps = {
lists: Array<ShoppingListDTO>;
setLists;
};

const ShoppingScreen = ({lists, setLists}:ShoppingScreenProps) => {
  return (
    <>
      <Navbar />
      <ShoppingList lists={lists} setLists={setLists} />
    </>
  );
};

export default ShoppingScreen;
