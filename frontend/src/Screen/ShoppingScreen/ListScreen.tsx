/* eslint-disable react/prop-types */

import React from 'react';
import {useParams} from 'react-router-dom';
import ListEdit from './ShoppingList/ListEdit';
import Navbar from '../../Shared/Components/Navbar/Navbar';
const ListScreen = ({lists, setLists}) => {
  const listId = useParams();
  return (
    <>
      <Navbar />
      <ListEdit listId={listId} lists={lists} setLists={setLists} />{' '}
    </>
  );
};

export default ListScreen;
