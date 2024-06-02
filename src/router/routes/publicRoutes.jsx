import React, { lazy } from 'react';
import Adminlogin from '../../views/auth/Adminlogin';
const Login = lazy(() => import('../../views/auth/Login'));
const Register = lazy(() => import('../../views/auth/Register'));
const Home = lazy(()=> import('../../views/Home'))   
const UnAuthorized = lazy(()=> import('../../views/UnAuthorized')) 
const Success = lazy(()=> import('../../views/Succes'))  

const publicRoutes = [

    {
        path: '/',
        element: <Home />,
      
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },

    {
        path: '/admin/login',
        element: <Adminlogin/>
    },

    {
        path : '/unauthorized',
        element : <UnAuthorized/>
    },

    {
        path : '/success?',
        element : <Success/>
    }
];

export default publicRoutes;
