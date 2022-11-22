import React from 'react';
import {useParams} from 'react-router-dom';
import ListEdit from './ShoppingList/ListEdit';
import {ShoppingListDTO} from '../../Shared/DTOs/ShoppingListDTO';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';

type ListScreenProps = {
lists: Array<ShoppingListDTO>;
 };

const ListScreen = ({lists} : ListScreenProps) => {
  const listId = useParams();
  return (
    <BaseLayout >
      <ListEdit listId={Number(listId.id)} lists={lists} />
    </BaseLayout>
  );
};

export default ListScreen;
