import React from 'react';
import AppLayout from '../components/AppLayout';

const Dashboard = (props) => {
    return (
        <AppLayout isAuth={true} history = {props.history}>
            <p>This is a Dashboard</p>
        </AppLayout>)
}

export default { component: Dashboard };