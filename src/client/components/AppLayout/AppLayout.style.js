import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  
  return ({
    root: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    content: open => ({
      padding:theme.spacing(3),
      paddingLeft:  open ? theme.spacing(30) : theme.spacing(3),
      transition: 'padding 0.1s'
    }),
    toolbar: theme.mixins.toolbar,
  })});