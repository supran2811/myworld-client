import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
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
                ...LoginPage
            },
            {
                ...NotFoundPage
            }
        ]
    }
];

