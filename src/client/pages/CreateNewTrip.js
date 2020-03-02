import React from 'react';
import AppLayout from '../components/AppLayout';
import CreateNewTripForm from '../components/CreateNewTripForm';
const CreateNewTrip = (props) => {
    return (
        <AppLayout isAuth={true} history={props.history}>
            <CreateNewTripForm />
        </AppLayout>)
}

export default { component: CreateNewTrip };