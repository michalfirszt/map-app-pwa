import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { createMuiTheme } from '@material-ui/core/styles';

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: grey[200],
    },
  },
});

export default lightTheme;
