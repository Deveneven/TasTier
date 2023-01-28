import React, {useEffect, useState} from 'react';
import RecipesList from '../../Shared/Components/RecipesList/RecipesList';
import {useParams} from 'react-router-dom';
import {RecipeDTO} from '../../Shared/DTOs/RecipeDTO';
import {Api} from '../../Utils/Api';
const RecipeScreen = () => {
  const {id} = useParams();
  const [data, setData] = useState<RecipeDTO>();
  const fetchData = async () => {
    const data = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/recipe?id_recipe=${id}`);
    if (data.success) {
      // TO DO: Sortowanie po dacie
      setData(data.text);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <RecipesList recipeSingle={data} />
  );
};

export default RecipeScreen;

