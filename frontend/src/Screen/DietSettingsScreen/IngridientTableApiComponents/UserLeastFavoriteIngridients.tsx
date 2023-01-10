import React, {useState, useEffect} from 'react';
import {Api} from '../../../Utils/Api';
import IngredientTableDiets from '../IngredientTableDiets';

const UserFavoriteIngidients = () => {
  const [getAllLeastFavIngridients, setGetAllLeastFavIngridients] = useState<any>();
  const [getUserLeastFavIngridients, setGetUserLeastFavIngridients] = useState<any>();

  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/ingredients/all`)
        .then((response) => {
          console.log(response);
          if (response.success) {
            const names = response.text.map(function(item) {
              return item['name'];
            });
            setGetAllLeastFavIngridients(names);
          }
        });
  }, []);
  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/diet/ingredients/disliked`)
        .then((response) => {
          console.log(response);
          if (response.success) {
            const names = response.text.map(function(item) {
              return item['name'];
            });
            setGetUserLeastFavIngridients(names);
          }
        });
  }, []);

  if (getAllLeastFavIngridients) {
    return (
      <IngredientTableDiets buttonName={'Ingredient'} tableName={'Your Least Favorite Ingredients'} deleteProp={'ingredients/disliked'}
        allOptions={getAllLeastFavIngridients} userOptions={getUserLeastFavIngridients} setUserOptions={setGetUserLeastFavIngridients} /> );
  }
  return null;
};

export default UserFavoriteIngidients;
