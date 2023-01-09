import React, {useEffect, useState} from 'react';
import {RecipeDTO} from '../../Shared/DTOs/RecipeDTO';
import {Api} from '../../Utils/Api';
import RecipesList from '../../Shared/Components/RecipesList/RecipesList';

const MyRecipesScreen = () => {
  const [dataAll, setDataAll] = useState<RecipeDTO[]>([]);

  const fetchData = async () => {
    const data = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/user/recipes`);
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

export default MyRecipesScreen;
