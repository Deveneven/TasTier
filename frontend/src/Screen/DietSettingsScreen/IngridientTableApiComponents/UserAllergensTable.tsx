import React, {useState, useEffect} from 'react';
import {Api} from '../../../Utils/Api';
import IngredientTableDiets from '../IngredientTableDiets';

const UserAllergensTable = () => {
  const [getAllAllergens, setGetAllAllergens] = useState<any>();
  const [getUserAllergens, setGetUserAllergens] = useState<any>();

  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/diet/allergens/get`)
        .then((response) => {
          if (response.success) {
            const names = response.text.map(function(item) {
              return item['name'];
            });
            setGetAllAllergens(names);
          }
        });
  }, []);
  useEffect(() => {
    Api.get(`${process.env.REACT_APP_DB_API}/diet/allergens/user`)
        .then((response) => {
          if (response.success) {
            const names = response.text.map(function(item) {
              return item['name'];
            });
            setGetUserAllergens(names);
          }
        });
  }, []);

  if (getAllAllergens) {
    return (
      <IngredientTableDiets buttonName={'allergen'} tableName={'Your allergens'} deleteProp={'allergens/user'}
        allOptions={getAllAllergens} userOptions={getUserAllergens} setUserOptions={setGetUserAllergens}/> );
  }
  return null;
};

export default UserAllergensTable;
