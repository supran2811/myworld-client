import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import intl from 'react-intl-universal';

import SideDrawer from '../SideDrawer';
import styles from './AppLayout.style';

const appDrawerConfig = [
    {
        label: intl.get('DRAWER_LABEL_MY_TRIP'),
        route: '/home'
    },
    {
        label: intl.get('DRAWER_LABEL_CREATE_NEW_TRIP'),
        route: '/newTrip'
    },
    {
        label: intl.get('DRAWER_LABEL_SETTINGS'),
        route: '/settings'
    },
]

const AppLayout = (props) => {
    const { isAuth, children, history } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDrawer, setOpenDrawer] = React.useState(true);
    const open = Boolean(anchorEl);
    const classes = styles(openDrawer);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const selectDrawerItem = React.useCallback((path) => {
        history.push(path)
    });
    const { location : { pathname }} = history; 
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setOpenDrawer(!openDrawer)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {intl.get('APP_TITLE')}
                    </Typography>
                    {isAuth && <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>{intl.get('PROFILE_LABEL')}</MenuItem>
                            <MenuItem onClick={handleClose}>{intl.get('LOGOUT_LABEL')}</MenuItem>
                        </Menu>
                    </div>}
                </Toolbar>
            </AppBar>
            <SideDrawer items={[
                {
                    label: intl.get('DRAWER_LABEL_MY_TRIP'),
                    route: '/home'
                },
                {
                    label: intl.get('DRAWER_LABEL_CREATE_NEW_TRIP'),
                    route: '/newTrip'
                },
                {
                    label: intl.get('DRAWER_LABEL_SETTINGS'),
                    route: '/settings'
                },
            ]}
                open={openDrawer}
                currentPath = {pathname}
                closeDrawer={() => setOpenDrawer(false)}
                selectItem={selectDrawerItem} />
            <div className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </div>
        </div>
    );
}

export default AppLayout;