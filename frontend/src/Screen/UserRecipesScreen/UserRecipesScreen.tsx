import React, {useEffect, useState} from 'react';
import {RecipeDTO} from '../../Shared/DTOs/RecipeDTO';
import {Api} from '../../Utils/Api';
// import RecipesList from '../../Shared/Components/RecipesList/RecipesList';
import {useParams} from 'react-router-dom';
import {Avatar, Card, CardActionArea, CardHeader} from '@mui/material'; // Grid
import RecipesList from '../../Shared/Components/RecipesList/RecipesList';

const UserRecipes = () => {
  const [dataAll, setDataAll] = useState<RecipeDTO[]>([]);
  const [dataFirst, setDataFirst] = useState<RecipeDTO>();
  const {id} = useParams();
  const fetchData = async () => {
    const data = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/friend/recipes?id_friend=${id}`); // ?id_user=${id} po user
    if (data.success) {
      // TO DO: Sortowanie po dacie
      setDataAll(data.text);
      setDataFirst(data.text[0]);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RecipesList dataAll={dataAll}>
      <Card className="card">
        <CardActionArea
        >
          <CardHeader
            avatar={<Avatar src={dataFirst?.avatar}/>}
            title={dataFirst?.username}
          />
        </CardActionArea>
      </Card>
    </RecipesList>
  );
};

export default UserRecipes;
