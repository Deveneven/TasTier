import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './CustomCard.scss';

const CustomCard = () => {
  return (
    <Card className='card'>
      <CardMedia/>
      <CardContent>
        text text text
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
};
export default CustomCard;
