import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#6573c3',
    },
    secondary: {
      main: '#ffea00',
      light: '#ffee33',
    },
    text: {
      primary: '#1f1f1f', //Dark Gray
      secondary: '#757575', //White
    },
  },
});

export default theme;
