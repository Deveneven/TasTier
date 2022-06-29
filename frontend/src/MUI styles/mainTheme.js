import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(28, 100%, 50%)',
      contrastText: 'hsl(0, 0%, 100%)',
    },
    secondary: {
      main: 'hsl(0, 0%, 100%)',
      contrastText: '#000',
    },
  },
});
export default theme;
