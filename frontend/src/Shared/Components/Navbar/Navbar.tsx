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
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import {Search as SearchIcon} from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
// eslint-disable-next-line max-len
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
// eslint-disable-next-line max-len
import RestaurantMenuOutlinedIcon from '@material-ui/icons/RestaurantMenuOutlined';

// /// Own imports ///// //

import UserMenu from './UserMenu';

function Navbar() {
  const StyledToolbar = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '1rem 0',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
      padding: '0.5rem 1rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '80%',
      margin: 'auto',
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
  const SearchSizeSmallBox = styled(Box)(({theme}) => ({
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    marginBottom: '1rem',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }));
  const SearchSizeSmall = styled(Box)(({theme}) => ({
    display: 'flex',
    backgroundColor: '#F0F0F0',
    padding: '0.4rem 0.8rem',
    borderRadius: '25px',
    width: '80%',
    margin: 'auto',
    alignItems: 'center',
    gap: '1rem',
    [theme.breakpoints.up('md')]: {
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
    <AppBar color="secondary" position="sticky">
      <StyledToolbar>
        <Typography
          variant="h3"
          noWrap
          sx={{
            display: {xs: 'none', sm: 'block'},
            fontFamily: 'Oriya MN',
            letterSpacing: 2,
            fontWeight: 600,
            fontSize: {md: '2rem'},
            margin: '0.5rem',
            marginLeft: '2rem',
          }}
        >
          TASTIER
        </Typography>
        <Search>
          <SearchIcon />
          <InputBase placeholder="search..." />
        </Search>
        <IconContainer>
          <IconButton
            aria-label="upload picture"
            component="span"
            color="inherit"
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
      <SearchSizeSmallBox>
        <SearchSizeSmall>
          <SearchIcon />
          <InputBase placeholder="search..." />
        </SearchSizeSmall>
      </SearchSizeSmallBox>
    </AppBar>
  );
}

export default Navbar;
