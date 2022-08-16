import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@material-ui/icons/Home';
// eslint-disable-next-line max-len
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
// eslint-disable-next-line max-len
import {useNavigate} from 'react-router-dom';
import MobileDrawer from './MobileDrawer';
function BottomNavigate() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  return (
    <>
      <MobileDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          display: {xs: 'flex', sm: 'none'},
          position: 'fixed',
          bottom: '0',
          width: '100%',
          zIndex: '100',
          borderTop: '1px solid gray',
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon fontSize="large" />}
          onClick={() => {
            navigate(`../`);
          }}
        />
        <BottomNavigationAction
          label="Favorites"
          icon={<BookmarkBorderOutlinedIcon fontSize="large" />}
        />
        <BottomNavigationAction
          onClick={() => {
            setIsDrawerOpen(true);
          }}
          label="Menu"
          icon={
            <Avatar sx={{width: 32, height: 32, marginTop: '0.25rem'}}>
              M
            </Avatar>
          }
        />
      </BottomNavigation>
    </>
  );
}

export default BottomNavigate;