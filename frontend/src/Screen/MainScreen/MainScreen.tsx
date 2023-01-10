import React, {useEffect, useState} from 'react';
import {RecipeDTO} from '../../Shared/DTOs/RecipeDTO';
import './MainScreen.scss';
import {Api} from '../../Utils/Api';
import RecipesList from '../../Shared/Components/RecipesList/RecipesList';

const MainScreen = () => {
  const [dataAll, setDataAll] = useState<RecipeDTO[]>([]);

  const fetchData = async () => {
    const data = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/recipes`);
    if (data.success) {
      setDataAll(data.text);
    }

    const metrics = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/metrics`);
    if (metrics.success) {
      localStorage.setItem('metrics', JSON.stringify(metrics.text));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <RecipesList dataAll={dataAll}/>
  );
};
export default MainScreen;
