import React from 'react';
import {useParams} from 'react-router-dom';
import ListEdit from '../../Shared/Components/ShoppingList/ListEdit';
import Navbar from '../../Shared/Components/Navbar/Navbar';
const ListScreen = () => {
  const listId = useParams();
  return (
    <>
      <Navbar />
      <ListEdit listId={listId} />{' '}
    </>
  );
};

export default ListScreen;
