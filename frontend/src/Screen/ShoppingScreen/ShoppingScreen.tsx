/* eslint-disable react/prop-types */

import React from 'react';
import ShoppingList from './ShoppingList/ShoppingList';
import Navbar from '../../Shared/Components/Navbar/Navbar';
const ShoppingScreen = ({lists, setLists}) => {
  return (
    <>
      <Navbar />
      <ShoppingList lists={lists} setLists={setLists} />
    </>
  );
};

export default ShoppingScreen;
