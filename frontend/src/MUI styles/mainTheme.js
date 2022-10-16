/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(28, 100%, 50%)',
      contrastText: 'hsl(0, 0%, 100%)',
    },
    secondary: {
      'main': 'hsl(0, 0%, 100%)',
      'contrastText': '#000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ( {ownerState}) => ({
          ...(ownerState.variant === 'text' &&
            ownerState.color === 'primary' && {
            'backgroundColor': 'inherit',
            'color': '#4b4f56',
            'marginTop': '1rem',
            '&:hover': {backgroundColor: 'inherit'},
          }),
	   }),
	   },
    },
  },
});

export default theme;

