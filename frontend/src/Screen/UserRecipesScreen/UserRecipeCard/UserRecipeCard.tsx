import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import noImage from '../../../assets/no_photo.jpg';
const UserRecipeCard = ({recipe}:any) => {
  console.log(recipe);
  const navigate = useNavigate();
  return (
    <Card sx={{Width: 340}}>
      <CardActionArea
        onClick={() => {
          navigate(`../recipes/recipe/${recipe.id}`);
        }}
      >
        {recipe.images.length > 0 ? (
          <CardMedia
            component="img"
            width="240px !important"
            height="100px !important"
            image={recipe.images[0]}
            alt={recipe.name}
          />
        ) :
<CardMedia
  component="img"
  width="240px !important"
  height="100px !important"
  image={noImage}
  alt="No Photo"
/>}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserRecipeCard;
