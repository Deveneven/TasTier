/*eslint-disable*/
import React, { useState} from 'react';
import AppBar from '@mui/material/AppBar';
import {
  Box,
  InputBase,
  styled,
  Typography,
  Toolbar,
  IconButton,
  Grid,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Search as SearchIcon} from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import RestaurantMenuOutlinedIcon from '@material-ui/icons/RestaurantMenuOutlined';
// /// Own imports ///// //
import BottomNavigate from './BottomNavigate';
import UserMenu from './UserMenu';
import NavbarMobile from './NavbarMobile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Navbar.scss';
import CustomAutocomplete from '../Autocomplete/CustomAutocomplete';
import FilteredMenu from './FilteredMenu';

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
    display: 'none',
  },
  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-evenly',
  },
}));
const Search = styled(Box)(({theme}) => ({
  display: 'flex',
  backgroundColor: '#F0F0F0',
  padding: '0.4rem 1rem',
  borderRadius: '15px',
  width: '25%',
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
function Navbar(props: any) {
  const navigate = useNavigate();
  const [searchText, setSearchTexta] = useState('');
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [filteredItem, setFilteredItem] = useState({
    ingredients: {liked: [], disliked: []},
    cousine: {liked: [], disliked: []},
    allergens: {liked: [], disliked: []},
    tags: {liked: [], disliked: []}
  });

  const setSearchText = (event) => {
    event.preventDefault();
    const {value} = event.target;
    setSearchTexta(value.toLowerCase())
    if (props.onSearch) {
      props.onSearch(value.toLowerCase());
    }
  };

  const changeIsMenuExpanded = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const onFilter = (elem) => {
    setFilteredItem(elem);
    setIsMenuExpanded(!isMenuExpanded);
    props.onFilter(elem);
  }
  return (
    <>
      <AppBar color="secondary" position="sticky">
        <StyledToolbar>
          <Typography
            component="h1"
            variant="h3"
            noWrap
            sx={{
              'display': {xs: 'none', sm: 'block'},
              'fontSize': '2rem',
              'margin': '0.5rem',
              'overflow': 'visible',
              '&:hover': {cursor: 'pointer'},
            }}
            onClick={() => {
              navigate(`../`);
            }}
          >
            TasTier
          </Typography>
          <Search>
            <SearchIcon />
            <InputBase
              placeholder="search..."
              sx={{width: '100%'}}
              onChange={setSearchText}
              value={searchText}/>
            <IconButton onClick={changeIsMenuExpanded}>
              <ExpandMoreIcon />
            </IconButton>
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
              onClick={() => {
                navigate(`../recipes/favorite`);
              }}
            >
              <BookmarkBorderOutlinedIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="upload picture"
              component="span"
              onClick={() => {
                navigate(`../recipe/0`);
              }}
            >
              <RestaurantMenuOutlinedIcon fontSize="large" />
            </IconButton>
            <UserMenu/>
          </IconContainer>
        </StyledToolbar>
        <NavbarMobile
          setSearchText={setSearchText}
          setIsMenuExpanded={changeIsMenuExpanded}/>
      </AppBar>
      <BottomNavigate />
      {isMenuExpanded && (
        <FilteredMenu
          onFilter={onFilter}
          defaultFilteredItem={filteredItem}/>
      )}
    </>
  );
}

export default Navbar;
