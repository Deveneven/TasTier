/* eslint-disable arrow-parens */
/* eslint-disable quote-props */
import React from 'react';
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
const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userLoggedState, setUserLoggedState] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
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
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
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
        {userLoggedState && (
          <>
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
            <MenuItem sx={{display: 'flex', gap: '1rem'}}>
              <FastfoodIcon fontSize="medium" /> Diet settings
            </MenuItem>
            <MenuItem sx={{display: 'flex', gap: '1rem'}}>
              <SettingsIcon fontSize="medium" /> Account settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => setUserLoggedState(false)}>
              Log Out
            </MenuItem>{' '}
          </>
        )}
        {!userLoggedState && (
          <>
            <MenuItem onClick={() => setUserLoggedState(true)}>Log in</MenuItem>
            <Divider />
            <MenuItem>Register</MenuItem>
          </>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default UserMenu;
