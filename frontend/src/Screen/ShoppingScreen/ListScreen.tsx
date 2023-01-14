import React from 'react';
import ListEdit from './ShoppingList/ListEdit';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';


const ListScreen = () => {
  return (
    <BaseLayout >
      <ListEdit />
    </BaseLayout>
  );
};

export default ListScreen;
