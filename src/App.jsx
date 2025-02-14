
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './Layouts/Layout/Layout'
import Home from './Pages/Home/Home'
import { HeroUIProvider } from '@heroui/react'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import Brands from './Pages/Brands/Brands'
import Categories from './Pages/Categories/Categories'
import Cart from './Pages/Cart/Cart'
import Notfound from './Pages/Notfound/Notfound'
import ProtectedRoute from './Auth/ProtectedRoute'
import AuthContextProvider from './Contexts/AuthContext'
import ProtectedAuthRoute from './Auth/ProtectedAuthRoute'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify';
import Address from './Pages/Address/Address'
import Allorders from './Pages/Orders/Allorders'
import Wishlist from './Pages/Wishlist/wishlist'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword'
import VerifyCode from './Pages/VerifyCode/VerifyCode'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import ProtectedPasswors from './Auth/ProtectedPasswors'



function App() {

  const quertclient = new QueryClient()

  const routers = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [

        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "register", element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute> },
        { path: "login", element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute> },
        { path: "forgetpassword", element: <ProtectedAuthRoute><ForgetPassword /></ProtectedAuthRoute> },
        { path: "verify-code", element: <ProtectedAuthRoute><ProtectedPasswors><VerifyCode /></ProtectedPasswors></ProtectedAuthRoute> },
        { path: "reset-password", element: <ProtectedAuthRoute><ProtectedPasswors><ResetPassword /></ProtectedPasswors></ProtectedAuthRoute> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "address/:cartId", element: <ProtectedRoute><Address /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><Allorders /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: "product/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "*", element: <Notfound /> },


      ]
    }
  ],
    {
      basename: "/freshCart"
    })


  return (

    <QueryClientProvider client={quertclient}>
      <AuthContextProvider>
        <HeroUIProvider>
          <RouterProvider router={routers}></RouterProvider>
          <ToastContainer />

        </HeroUIProvider>
      </AuthContextProvider>
    </QueryClientProvider>


  )
}

export default App
