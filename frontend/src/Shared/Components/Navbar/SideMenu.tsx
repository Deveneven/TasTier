import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
function SideMenu() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{width: '80vw', margin: 'auto'}}
        role="presentation"
        textAlign="center"
      >
        <Typography
          sx={{margin: 'auto', textAlign: 'center'}}
          variant="h4"
          component="div"
        >
          Menu
        </Typography>
        <List>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('../recipe/0');
              }}
            >
              <ListItemIcon>
                <AddIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={'Add recipe'} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('../shoppinglist');
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={'Shopping Lists'} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('../myrecipes');
              }}>
              <ListItemIcon>
                <MenuBookIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={'Your Recipes'} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('../diets');
              }}
            >
              <ListItemIcon>
                <FastfoodIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={'Diet settings'} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('../account/settings');
              }}>
              <ListItemIcon>
                <SettingsIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={'Settings'} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('../signin');
              }}>
              <ListItemIcon>
                <PowerSettingsNewIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={'Log out'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
}

export default SideMenu;
