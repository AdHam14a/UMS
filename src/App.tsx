import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './Components/AuthLayout/AuthLayout'
import NotFound from './Components/NotFound/NotFound'
import MainLayout from './Components/MainLayout/MainLayout'
import Login from './Components/AuthLayout/Login/Login'
import Home from './Components/MainLayout/Home/Home'
import Users from './Components/MainLayout/Users/Users'
import AddUser from './Components/MainLayout/AddUser/AddUser'
import Profile from './Components/MainLayout/Profile/Profile'
import {ToastContainer} from "react-toastify";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element: <Login />
        },
        {
          path: "login", element: <Login />
        }
      ]
    },
    {
      path: "dashboard",
      element: <MainLayout /> ,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element: <Home />
        },
        {
          path:"home", element: <Home />
        },
        {
          path: "users", element: <Users />
        },
        {
          path: "add-user", element: <AddUser />
        },
        {
          path: "profile", element: <Profile />
        },
      ]
    }
  ])
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
