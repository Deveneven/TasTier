import React from 'react';
import {Box, InputBase, styled, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Search as SearchIcon} from '@material-ui/icons';

function NavbarMobile() {
  const navigate = useNavigate();

  const SearchSizeSmallBox = styled(Box)(({theme}) => ({
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    marginBottom: '1rem',
    [theme.breakpoints.up('md')]: {
      display: 'none',
      marginTop: '2rem',
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
    gap: '0.5rem',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }));
  return (
    <>
      <SearchSizeSmallBox>
        <Typography
          variant="h3"
          noWrap
          sx={{
            'display': {xs: 'block', sm: 'none'},
            'fontFamily': 'Oriya MN',
            'letterSpacing': 2,
            'fontWeight': 600,
            'fontSize': '2rem',
            'textAlign': 'center',
            'margin': '1rem',
            'transition': 'all .2s ease-in',
            '&:hover': {cursor: 'pointer', transform: 'scale(1.05)'},
          }}
          onClick={() => {
            navigate(`../`);
          }}
        >
          TASTIER
        </Typography>
        <SearchSizeSmall>
          <SearchIcon />
          <InputBase placeholder="search..." />
        </SearchSizeSmall>
      </SearchSizeSmallBox>
    </>
  );
}

export default NavbarMobile;
