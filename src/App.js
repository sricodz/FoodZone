import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { About, AdminDashboard, AdminMenuItems, Cart, CheckOrders, Contact, ForgotPasswordForm, FPassEmailSent, Front, Home, Login, MenuItems, PageNotFound, Profile, Register, SingleItem } from "./pages";
import { Admin, OtpProtectedRoute, ProtectedRoute } from "./components";


const user = JSON.parse(localStorage.getItem('user'));

const router = createBrowserRouter([
  {
    path : '/',
    element : <Home/>,
    children :[
      {
        path:"",
        element:<Front/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:'contact',
        element:<Contact/>
      },
      {
        path:'menuItems',
        element:<MenuItems/>
        //loader: menuItemsLoader
      },
      {
        path:'menuItems/:id',
        element:<SingleItem/>
      },
      {
        path:'cart',
        element:<Cart />
      },
      {
        path:'login',
        element: !user ?  <Login/> : <Front />  
      },
      {
        path:'register',
        element: !user ? <Register/> : <Front /> 
      },
      {
        path:'fp/verifyemail',
        element: !user ? <FPassEmailSent /> : <Front /> 
      },
      {
        path:'forgotpassword',
        element: !user ? <OtpProtectedRoute element={<ForgotPasswordForm />}  /> : <Front /> 
      },
      {
        path:"profile",
        element : <Profile />
      }
    ]    
  },
  {
    path : '/admin',
    element : <ProtectedRoute element={<AdminDashboard />} requiredRole="ADMIN" />,
    children :[
      {
        path: '',
        element:<ProtectedRoute element={<Admin/>} requiredRole="ADMIN" />
      },
      {
        path: 'checkOrders',
        element:<ProtectedRoute element={<CheckOrders/>} requiredRole="ADMIN" />
      },
      {
        path: 'menuItems',
        element:<ProtectedRoute element={<AdminMenuItems/>} requiredRole="ADMIN" />
      }

      //Add more child routes here if needed   
    ]
  },
  {
    path : "*",
    element : <PageNotFound />
  }
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
