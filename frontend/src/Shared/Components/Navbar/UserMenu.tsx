import React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
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

const UserMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userLoggedState, setUserLoggedState] = React.useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (localStorage.getItem('loggedState') === 'loggedIn') {
      setUserLoggedState(true);
    } else {
      setUserLoggedState(false);
    }
  }, []);
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
            <Avatar sx={{width: 32, height: 32}}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <IconButton size="small" sx={{ml: 2, display: {sm: 'none', xs: 'block'}}}>
        <Avatar sx={{width: 32, height: 32}}>M</Avatar>
      </IconButton>
      {userLoggedState && (
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
            <Avatar /> User123
          </MenuItem>
          <Divider />
          <MenuItem sx={{display: 'flex', gap: '1rem'}}>
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
            onClick={() => localStorage.setItem('loggedState', 'loggedOut')}
          >  <Link to="../signin">
                Log Out
            </Link>
          </MenuItem>
        </Menu>
      )}
      {!userLoggedState && (
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
