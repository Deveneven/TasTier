import React from 'react';
import {Box, IconButton, InputBase, styled, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Search as SearchIcon} from '@material-ui/icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

function NavbarMobile(props: any) {
  const navigate = useNavigate();
  return (
    <>
      <SearchSizeSmallBox>
        <Typography
          component="h1"
          variant="h3"
          sx={{
            'display': {xs: 'block', sm: 'none'},
            'fontSize': '2rem',
            'textAlign': 'center',
            'margin': '1rem',
            '&:hover': {cursor: 'pointer'},
          }}
          onClick={() => {
            navigate(`../`);
          }}
        >
          TasTier
        </Typography>
        <SearchSizeSmall>
          <SearchIcon />
          <InputBase placeholder="search..." sx={{width: '100%'}} onChange={props.setSearchText}/>
          <IconButton onClick={props.setIsMenuExpanded}>
            <ExpandMoreIcon />
          </IconButton>
        </SearchSizeSmall>
      </SearchSizeSmallBox>
    </>
  );
}

export default NavbarMobile;
