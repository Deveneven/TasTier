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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {Chat, ExpandMore, ThumbUpAltOutlined} from '@material-ui/icons';

type CustomCardProps = {
  data: RecipeDTO;
};

const CustomCard = ({data}: CustomCardProps) => {
  const [expanded, setExpanded] = useState(false);

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
      <Button
        fullWidth={true}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <ExpandMore />
      </Button>
      <Collapse in={expanded}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Calories</TableCell>
              </TableRow>
            </TableHead>
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
