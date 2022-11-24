import React from 'react';
import ShoppingList from './ShoppingList/ShoppingList';
import {ShoppingListDTO} from '../../Shared/DTOs/ShoppingListDTO';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';

type ShoppingScreenProps = {
lists: Array<ShoppingListDTO>;
setLists;
};

const ShoppingScreen = ({lists, setLists}:ShoppingScreenProps) => {
  return (
    <BaseLayout>
      <ShoppingList lists={lists} setLists={setLists} />
    </BaseLayout>
  );
};

export default ShoppingScreen;
