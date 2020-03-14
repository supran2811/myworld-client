import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../../styles/constants';
const drawerWidth = DRAWER_WIDTH;
export default makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex:'1000 !important'
      },
      root:{
        zIndex: 1000
      },
      drawerPaper: {
        width: drawerWidth,
      },
      toolbar: theme.mixins.toolbar,
  }));