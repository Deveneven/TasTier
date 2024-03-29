import React, {useContext} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import {useNavigate} from 'react-router-dom';
import MobileDrawer from './MobileDrawer';
import UserAvatar from '../UserAvatar/UserAvatar';
import UserContext from '../../../Contexts/UserContext';
function BottomNavigate() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const {user} = useContext(UserContext);
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
          onClick={() => {
            if (!!user) {
              navigate(`../recipes/favorite`);
            } else {
              navigate('../signin');
            }
          }}
        />
        <BottomNavigationAction
          onClick={() => {
            if (!!user) {
              setIsDrawerOpen(true);
            } else {
              navigate(`../signin`);
            }
          }}
          label="Menu"
          icon={
            <UserAvatar />
          }
        />
      </BottomNavigation>
    </>
  );
}

export default BottomNavigate;

