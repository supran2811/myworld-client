import React , { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './SideDrawer.style';

const SideDrawer = (props) => {
    const classes = styles();
    const { items , open , selectItem , currentPath} = props;

    const handleItemSelected = (e , route) => {
        selectItem(route);
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="temporary"
            open={open}
            hideBackdrop={true}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />

            <List>
                {
                    items.map(({label,route} ,index) => (
                        <ListItem button key={label}
                            selected = {route === currentPath}
                            onClick = {(e) => handleItemSelected(e,route)}>
                            <ListItemText primary={label} />
                        </ListItem>
                    ))
                }
            </List>

        </Drawer>
    );
}

export default SideDrawer;