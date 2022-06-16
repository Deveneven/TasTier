import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './CustomCard.scss';
import {RecipeDTO} from '../../DTOs/RecipeDTO';
import {
  Avatar,
  CardHeader,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {Chat, ThumbUpAltOutlined} from '@material-ui/icons';

type CustomCardProps = {
  data: RecipeDTO;
};

const CustomCard = ({data}: CustomCardProps) => {
  return (
    <Card className="card">
      <CardHeader
        avatar={<Avatar src="/broken-image.jpg" />}
        title={data.User.Nickname}
      />
      <CardMedia component="img" height="200" image={data.Image} />
      <CardActions>
        <IconButton>
          <Chat />
        </IconButton>
        <IconButton>
          <ThumbUpAltOutlined />
        </IconButton>
      </CardActions>
      <CardContent>{data.Description}</CardContent>
      <Collapse>
        <TableContainer>
          <Table>
            <TableBody>
              {data.Ingredients.map((ingredient) => (
                <TableRow key={ingredient.Id}>
                  <TableCell>{ingredient.Name}</TableCell>
                  <TableCell>{ingredient.Calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Card>
  );
};
export default CustomCard;
