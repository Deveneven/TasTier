import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import UserAvatar from '../UserAvatar/UserAvatar';
import UserContext from '../../../Contexts/UserContext';
const UserMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {user} = useContext(UserContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: {sm: 'flex', xs: 'none'},
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ml: 2}}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <UserAvatar />
          </IconButton>
        </Tooltip>
      </Box>
      <IconButton size="small" sx={{ml: 2, display: {sm: 'none', xs: 'block'}}}>
        <UserAvatar />
      </IconButton>
      {user && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          disableScrollLock={true}
          PaperProps={{
            elevation: 0,
            sx: {
              'overflow': 'visible',
              'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              'mt': 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
          <MenuItem>
            <UserAvatar user={user}/>
            {user.name}
          </MenuItem>
          <Divider />
          <MenuItem sx={{display: 'flex', gap: '1rem'}}
            onClick={() => {
              navigate('../recipe/0');
            }}>
            <AddIcon fontSize="medium" /> Add recipe
          </MenuItem>
          <MenuItem sx={{display: 'flex', gap: '1rem'}}>
            <MenuBookIcon fontSize="medium" /> Your recipes
          </MenuItem>
          <MenuItem sx={{display: 'flex', gap: '1rem'}}
            onClick={() => {
              navigate('../diets');
            }}>
            <FastfoodIcon fontSize="medium" /> Diet settings
          </MenuItem>
          <MenuItem
            sx={{display: 'flex', gap: '1rem'}}
            onClick={() => {
              navigate('../shoppinglist');
            }}
          >
            <ShoppingCartIcon fontSize="medium" /> Shopping Lists
          </MenuItem>
          <MenuItem sx={{display: 'flex', gap: '1rem'}}
            onClick={() => {
              navigate('../account/settings');
            }}>
            <SettingsIcon fontSize="medium" /> Account settings
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              localStorage.removeItem('TastierToken');
              navigate('../signin');
            }}
          > Log Out
          </MenuItem>
        </Menu>
      )}
      {!user && (
        <>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            disableScrollLock={true}
            PaperProps={{
              elevation: 0,
              sx: {
                'overflow': 'visible',
                'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                'mt': 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          > <MenuItem>
              <Link to="../signin">
              Log in
              </Link>
            </MenuItem>{' '}
          </Menu>
        </>
      )}
    </React.Fragment>
  );
};

export default UserMenu;
