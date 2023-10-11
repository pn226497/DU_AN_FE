import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { store } from './app/store';
import App from './App';
import './index.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Home from './pages/Home';
import withAuthentication from './hoc/withAuth';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  
  {
    path:"/login",
    element: <Login/>,
    
  },
  {
    path:"/",
    element: withAuthentication(Home),
    children:[
      {
        path: "/chat",
        element:<Chat/>
      }
    ]
    
  },
])
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} >
         <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
