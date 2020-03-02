import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import CreateNewTrip from './pages/CreateNewTrip';
import Settings from './pages/Settings';
import NotFoundPage from './pages/NotFoundPage';

export default [
    {
        ...App , 
        routes : [
            {
                path: "/",
                exact: true,
                ...HomePage
        
            },
            {
                path:"/login",
                ...AuthPage
            },
            {
                path:"/signup",
                ...AuthPage
            },
            {
                path:"/home",
                ...Dashboard
            },
            {
                path:"/newTrip",
                ...CreateNewTrip
            },
            {
                path:"/settings",
                ...Settings
            },
            {
                ...NotFoundPage
            }
        ]
    }
];

