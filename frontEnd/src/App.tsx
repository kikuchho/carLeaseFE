import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import UnprotectedHome from './pages/unProtectedHome'
import ProtetedRoute from './components/ProtectedRoutes'

function Logout() {
  localStorage.clear()
  return <Navigate to={"/login"} /> 
}

function RegisterAndLogout() {
  //clear token first 
  localStorage.clear()
  return <Register />
}

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
          path="/oldhome" 
          element={
            <ProtetedRoute>
              <Home/>
            </ProtetedRoute>
          }    />
          <Route  path='/' element={<UnprotectedHome /> } />
          <Route  path='/logout' element={<Logout/>    }   />
          <Route  path='/login' element={<Login/>    }   />
          <Route  path='/register' element={ <RegisterAndLogout/>   }   />
          <Route  path='*' element={ <NotFound />  }   />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
