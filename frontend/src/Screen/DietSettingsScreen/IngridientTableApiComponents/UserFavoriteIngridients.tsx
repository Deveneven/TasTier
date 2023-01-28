import React, {useState, useEffect} from 'react';
import {Api} from '../../../Utils/Api';
import IngredientTableDiets from '../IngredientTableDiets';

const UserFavoriteIngidients = () => {
  const [getAllFavIngridients, setGetAllFavIngridients] = useState<any>();
  const [getUserFavIngridients, setGetUserFavIngridients] = useState<any>();

  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/ingredients/all`)
        .then((response) => {
          if (response.success) {
            const names = response.text.map(function(item) {
              return item['name'];
            });
            setGetAllFavIngridients(names);
          }
        });
  }, []);
  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/diet/ingredients/favorite`)
        .then((response) => {
          if (response.success) {
            const names = response.text.map(function(item) {
              return item['name'];
            });
            setGetUserFavIngridients(names);
          }
        });
  }, []);

  if (getAllFavIngridients) {
    return (
      <IngredientTableDiets buttonName={'Ingredient'} tableName={'Your Favorite Ingredients'} deleteProp={'ingredients/favorite'}
        allOptions={getAllFavIngridients} userOptions={getUserFavIngridients} setUserOptions={setGetUserFavIngridients} /> );
  }
  return null;
};

export default UserFavoriteIngidients;
