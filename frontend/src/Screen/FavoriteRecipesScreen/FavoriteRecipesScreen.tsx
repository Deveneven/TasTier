import React, {useEffect, useState} from 'react';
import RecipesList from '../../Shared/Components/RecipesList/RecipesList';
import {RecipeDTO} from '../../Shared/DTOs/RecipeDTO';
import {Api} from '../../Utils/Api';

const FavoriteRecipesScreen = () => {
  const [dataAll, setDataAll] = useState<RecipeDTO[]>([]);

  const fetchData = async () => {
    const data = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/recipes/favorite`);
    if (data.success) {
      // TO DO: Sortowanie po dacie
      setDataAll(data.text);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <RecipesList dataAll={dataAll}/>
  );
};
export default FavoriteRecipesScreen;
