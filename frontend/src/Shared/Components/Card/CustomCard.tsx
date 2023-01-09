/* eslint-disable */ 
import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './CustomCard.scss';
import {RecipeDTO} from '../../DTOs/RecipeDTO';
import {
  Avatar,
  Button,
  CardHeader,
  Chip,
  Collapse,
  IconButton,
  Rating,
  Stack,
} from '@mui/material';
import {Chat, ExpandMore, ThumbUpAltOutlined} from '@material-ui/icons';
import IngredientTable from '../IngredientTable/IngredientTable';
import Comment from '../Comment/Comment';
import {CardMedia, Typography} from '@material-ui/core';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SquareIcon from '@mui/icons-material/Square';
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';

type CustomCardProps = {
  data: RecipeDTO;
};

const CustomCard = ({data}: CustomCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [commentIsVisible, setCommentIsVisible] = useState(false);

  const addNewComment = () => {
    setCommentIsVisible(!commentIsVisible);
  };
  return (
    <Card className="card">
      <CardHeader
        avatar={<Avatar src={data.avatar} />}
        title={data.username}
      />
      {data.images && (
        <CardMedia component="img" height="200" image={data.images[0]} />
      )}
      <CardActions>
        <IconButton onClick={addNewComment}>
          <Chat />
        </IconButton>
        <IconButton>
          <ThumbUpAltOutlined />
        </IconButton>
      </CardActions>
      <CardContent>
        {data.name}
        <div className='recipe-rating'>
          <Rating
            max={10}
            color='primary'
            disabled={true}
            size='small'
            name="difficulty"
            defaultValue={data.rating}/>
        </div>
      </CardContent>
      <Button
        fullWidth={true}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <ExpandMore />
      </Button>
      <Collapse in={expanded}>
        <div className='expanded-content'>
          <Typography component="legend">Difficulty:</Typography>
          <Rating
            disabled={true}
            size='large'
            name="difficulty"
            defaultValue={data.difficulty}
            icon={<SquareIcon/>}
            emptyIcon={<SquareOutlinedIcon/>}/>
          <div className='cooking-time'>
            <AccessTimeIcon/>
            {data.time}
          </div>
          <br/>
          <br/>
          {data.description}
          <br/>
          {data.steps?.map((step) => {
            return (<div key={step.step_number}>
              {step.step_number}. {step.stepdesc}
            </div>);
          })}
          <br/>
          <IngredientTable
            isEditable={false}
            data={data.ingredients}/>
          <br/>
          <Stack
            direction='row'
            alignItems='center'
            spacing={2}>
            {data.tags?.map((tag) => {
              return (
                <Chip key={tag.id_tag} label={tag.tagName} color='primary' />
              );
            })}
          </Stack>
        </div>
      </Collapse>
      {!!commentIsVisible ?
      <Comment /> :
      ''}
    </Card>
  );
};
export default CustomCard;
