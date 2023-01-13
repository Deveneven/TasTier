import React from 'react';
import ShoppingList from './ShoppingList/ShoppingList';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';

const ShoppingScreen = () => {
  return (
    <BaseLayout>
      <ShoppingList />
    </BaseLayout>
  );
};

export default ShoppingScreen;
