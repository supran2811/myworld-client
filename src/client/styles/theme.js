import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import * as Constants from './constants';
// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    htmlFontSize: 20,
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    }
  },
  overrides:{
    MuiDrawer:{
      root:{
        width:Constants.DRAWER_WIDTH
      },
      paper:{
        width:Constants.DRAWER_WIDTH
      }
    }
  }
});

export default theme;