import { lazy } from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/publicRoute';

const Login = lazy(() => import('./pages/Login'));
const MyProfile = lazy(() => import('./pages/MyProfile'));
const ManageUsers = lazy(() => import('./pages/ManageUsers'));
const ManageAccounts = lazy(() => import('./pages/ManageAccounts'));

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicRoute />}>
            <Route index element={<Login />} />
          </Route>
          <Route path='/Private' element={<PrivateRoute />}>
              <Route index element={<MyProfile />} />
              <Route path='/Private/ManageUsers' element={<ManageUsers />} />
              <Route path='/Private/ManageAccounts' element={<ManageAccounts />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
