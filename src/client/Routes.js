import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
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
                ...NotFoundPage
            }
        ]
    }
];

