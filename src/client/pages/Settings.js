import React from 'react';
import AppLayout from '../components/AppLayout';

const Settings = (props) => {
    return (
        <AppLayout isAuth={true} history={props.history}>
            <p>Settings page</p>
        </AppLayout>)
}

export default { component: Settings };