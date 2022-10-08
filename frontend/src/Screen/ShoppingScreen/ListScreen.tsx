import React from 'react';
import {useParams} from 'react-router-dom';
import ListEdit from './ShoppingList/ListEdit';
import Navbar from '../../Shared/Components/Navbar/Navbar';
import {ShoppingListDTO} from '../../Shared/DTOs/ShoppingListDTO';

type ListScreenProps = {
lists: Array<ShoppingListDTO>;
 };

const ListScreen = ({lists} : ListScreenProps) => {
  const listId = useParams();
  return (
    <>
      <Navbar />
      <ListEdit listId={Number(listId.Id)} lists={lists} />
    </>
  );
};

export default ListScreen;
