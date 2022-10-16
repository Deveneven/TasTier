import React from 'react';
import AppBar from '@mui/material/AppBar';
import {
  Box,
  InputBase,
  styled,
  Typography,
  Toolbar,
  IconButton,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import {Search as SearchIcon} from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import RestaurantMenuOutlinedIcon from '@material-ui/icons/RestaurantMenuOutlined';
// /// Own imports ///// //
import BottomNavigate from './BottomNavigate';
import UserMenu from './UserMenu';
import NavbarMobile from './NavbarMobile';
function Navbar() {
  const navigate = useNavigate();
  const StyledToolbar = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '1rem 0',
    width: '100%',
    [theme.breakpoints.down('xl')]: {
      justifyContent: 'space-evenly',
      margin: 'auto',
      padding: '0.5rem 1rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '80%',
      margin: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: 'white',
      // position: 'fixed',
      // bottom: 0,
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
    },
  }));
  const Search = styled(Box)(({theme}) => ({
    display: 'flex',
    backgroundColor: '#F0F0F0',
    padding: '0.4rem 1rem',
    borderRadius: '15px',
    width: '40%',
    margin: 'auto',
    alignItems: 'center',
    gap: '1rem',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }));
  const IconContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: '1rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 'auto',
      gap: '2rem',
    },
    [theme.breakpoints.up('xs')]: {
      gap: '1rem',
    },
  }));
  return (
    <>
      <AppBar color="secondary" position="sticky">
        <StyledToolbar>
          <Typography
            variant="h3"
            noWrap
            sx={{
              'display': {xs: 'none', sm: 'block'},
              'fontFamily': 'Oriya MN',
              'letterSpacing': 2,
              'fontWeight': 600,
              'fontSize': '2rem',
              'margin': '0.5rem',
              'transition': 'all .2s ease-in',
              '&:hover': {cursor: 'pointer', transform: 'scale(1.05)'},
            }}
            onClick={() => {
              navigate(`../`);
            }}
          >
            TASTIER
          </Typography>
          <Search>
            <SearchIcon />
            <InputBase placeholder="search..." sx={{width: '100%'}} />
          </Search>
          <IconContainer>
            <IconButton
              aria-label="upload picture"
              component="span"
              color="inherit"
              onClick={() => {
                navigate(`../`);
              }}
            >
              <HomeIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="upload picture"
              component="span"
              color="inherit"
            >
              <ExploreOutlinedIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="upload picture"
              component="span"
              color="inherit"
            >
              <BookmarkBorderOutlinedIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="upload picture"
              component="span"
              color="inherit"
            >
              <RestaurantMenuOutlinedIcon fontSize="large" />
            </IconButton>
            <UserMenu />
          </IconContainer>
        </StyledToolbar>
        <NavbarMobile />
      </AppBar>
      <BottomNavigate />
    </>
  );
}

export default Navbar;
