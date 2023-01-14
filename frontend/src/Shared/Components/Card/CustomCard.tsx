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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {Chat, ExpandMore, ThumbUpAltOutlined} from '@material-ui/icons';
import IngredientTable from '../IngredientTable/IngredientTable';
import Comment from '../Comment/Comment';
import {CardMedia, Typography} from '@material-ui/core';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SquareIcon from '@mui/icons-material/Square';
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import AddToShoppingListButton from './AddToShoppingListButton/AddToShoppingListButton';
import {CommentDTO} from '../../DTOs/CommentDTO';
import {Api} from '../../../Utils/Api';

type CustomCardProps = {
  data: RecipeDTO;
};

const CustomCard = ({data}: CustomCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [commentIsVisible, setCommentIsVisible] = useState(false);
  const [comments, setComments] = useState<CommentDTO[]>([]);

  const addNewComment = () => {
    setCommentIsVisible(!commentIsVisible);
    if (data.id) {
      Api.get(`${process.env.REACT_APP_DB_API}/recipes/comment/${data.id}`)
          .then((response) => {
            if (response.success) {
              setComments(response.text);
            }
          });
    }
  };
  const addRating = (event) => {
    const {value} = !!event.target ? event.target : null;
    const numberValue = Number(value);

    const payload = {
      rating: numberValue,
      recipeid: data.id,
    };
    Api.post(`${process.env.REACT_APP_DB_API}/recipes/rating`, payload)
        .then((response) => {
          if (response.success) {
            console.log(response);
          }
        });
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
        <AddToShoppingListButton data={data.ingredients}/>
      </CardActions>
      <CardContent>
        {data.name}
        <div className='recipe-rating'>
          <Rating
            max={10}
            color='primary'
            size='small'
            defaultValue={data.rating}
            onChange={addRating}/>
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
            return (<div key={step.step_Number}>
              {step.step_Number}. {step.stepDesc}
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
      {!!commentIsVisible &&
      (
        <div className='expanded-content'>
          <Comment setComments={setComments} recipeId={data.id}/>
          <List>
            {comments?.map((comment, index) => {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src={comment.avatar}/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.text}/>
                </ListItem>
              );
            })}
          </List>
        </div>
      )}
    </Card>
  );
};
export default CustomCard;
