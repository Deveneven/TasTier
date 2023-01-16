import React, {useEffect, useState} from 'react';
import {RecipeDTO} from '../../Shared/DTOs/RecipeDTO';
import {Api} from '../../Utils/Api';
// import RecipesList from '../../Shared/Components/RecipesList/RecipesList';
// import {useParams} from 'react-router-dom';
import {Box, Grid} from '@mui/material';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import UserAvatar from '../../Shared/Components/UserAvatar/UserAvatar';
import UserName from '../../Shared/Components/UserName/UserName';
import UserRecipeCard from './UserRecipeCard/UserRecipeCard';

const UserRecipes = () => {
  const [dataAll, setDataAll] = useState<RecipeDTO[]>([]);
  // const {id} = useParams();
  const user = {
    name: 'Test',
    lastname: 'user',
  };
  const fetchData = async () => {
    const data = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/user/recipes`); // ?id_user=${id} po user
    if (data.success) {
      // TO DO: Sortowanie po dacie
      console.log(data.success);
      setDataAll(data.text);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseLayout>
      <Box
        maxWidth="md"
        sx={{
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          padding: '2rem',
        }}
      >
        <Grid
          container
          maxWidth="md"
          direction="row"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          gap="2rem"
        >
          <Grid
            container
            margin="auto"
            sx={{gap: {xs: '1rem', sm: '2rem'}}}
          >
            <Grid item md={3}
            >
              <UserAvatar user={user} sx={{width: 56, height: 56, float: {md: 'right', xs: 'left'}}} />
            </Grid>
            <Grid item md={8} sx={{textAlign: {xs: 'center', sm: 'left'}, marginBottom: 'auto', marginTop: 'auto'}} >
              <UserName />
            </Grid>
          </Grid>
          {/* <RecipesList dataAll={dataAll}/> */}
          {/* //  <UserRecipeCard recipe={dataAll[0]}/> */}
          {dataAll?.map((recipe: RecipeDTO) => {
            return (
              <UserRecipeCard recipe={recipe} key={recipe.id} />
            );
          })}
        </Grid>
      </Box>
    </BaseLayout>
  );
};

export default UserRecipes;
