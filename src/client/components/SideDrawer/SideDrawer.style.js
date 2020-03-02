import { makeStyles } from '@material-ui/core/styles';
// const drawerWidth = 240;
export default makeStyles(theme => ({
    drawer: {
        // width: drawerWidth,
        flexShrink: 0,
        zIndex:'1000 !important'
      },
      root:{
        zIndex: 1000
      },
      drawerPaper: {
        // width: drawerWidth,
      },
      toolbar: theme.mixins.toolbar,
  }));