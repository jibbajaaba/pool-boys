//@ts-check
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { store } from './app/store'
import { Provider } from 'react-redux'

import Home from './components/Home'
import ProfilePage from './components/ProfilePage'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import CreatePoolForm from './components/CreatePoolForm'
import UpdatePoolForm from './components/UpdatePoolForm'
import App from './App'


import './index.css'

const BASE_URL = import.meta.env.BASE_URL
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined')
}

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: 'signup',
                    element: <SignUpForm />,
                },
                {
                    path: 'signin',
                    element: <SignInForm />,
                },
                {
                    path: 'profile',
                    element: <ProfilePage />,
                },
                {
                    path: 'pools/create',
                    element: <CreatePoolForm />,
                },
                {
                    path: 'pools/update/:pool_id',
                    element: <UpdatePoolForm />
                }
            ],
        },
    ],
    {
        basename: BASE_URL,
    }
)

const rootElement = document.getElementById('root')
if (!rootElement) {
    throw new Error('root element was not found!')
}

// Log out the environment variables while you are developing and deploying
// This will help debug things
// console.table(import.meta.env)

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
