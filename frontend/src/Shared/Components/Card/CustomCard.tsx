import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './CustomCard.scss';
import {RecipeDTO} from '../../DTOs/RecipeDTO';
import {
  Avatar,
  Button,
  CardHeader,
  Collapse,
  IconButton,
} from '@mui/material';
import {Chat, ExpandMore, ThumbUpAltOutlined} from '@material-ui/icons';
import IngredientTable from '../IngredientTable/IngredientTable';
import Comment from '../Comment/Comment';

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
        avatar={<Avatar src="/broken-image.jpg" />}
        title={data.Username}
      />
      {/* <CardMedia component="img" height="200" image={data.Images} /> */}
      <CardActions>
        <IconButton onClick={addNewComment}>
          <Chat />
        </IconButton>
        <IconButton>
          <ThumbUpAltOutlined />
        </IconButton>
      </CardActions>
      <CardContent>{data.Description}</CardContent>
      <Button
        fullWidth={true}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <ExpandMore />
      </Button>
      <Collapse in={expanded}>
        <IngredientTable
          isEditable={false}
          data={data.Ingredients}/>
      </Collapse>
      {!!commentIsVisible ?
      <Comment /> :
      ''}
    </Card>
  );
};
export default CustomCard;
