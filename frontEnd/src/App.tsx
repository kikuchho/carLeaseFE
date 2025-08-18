import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import UnprotectedHome from './pages/UnprotectedHome'
import ProtectedRoute from './components/ProtectedRoutes'
import Stepone from './pages/register/Stepone'
import Steptwo from './pages/register/Steptwo'
import Stepthree from './pages/register/Stepthree'
import Stepfour from './pages/register/Stepfour'
import 'bootstrap/dist/css/bootstrap.min.css';
import CarPlan from './pages/CarPlan'
import CarPlanLoggedOut from './pages/CarPlanLoggedOut'
import Stepfive from './pages/register/Stepfive'


function Logout() {
  localStorage.clear()
  return <Navigate to={"/login"} /> 
}

function RegisterAndLogout() {
  //clear token first 
  localStorage.clear()
  return <Stepone /> 
}

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
          path="/protectedhome" 
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }    />
          <Route  path='/' element={<UnprotectedHome /> } />
          <Route  path='/logout' element={<Logout/>    }   />
          <Route  path='/login' element={<Login/>    }   />
          <Route  path='/carplan' element={ <CarPlan isAuthorized={true}  />  }   />
          <Route  path='/carplanloggedout' element={ <CarPlanLoggedOut isAuthorized={false}/>    }   />
          <Route  path='/register/stepone' element={ <RegisterAndLogout  />   }   />
          <Route  path='/register/steptwo' element={ <Steptwo/>  }   />
          <Route  path='/register/stepthree' element={ <Stepthree/>  }   />
          <Route  path='/register/stepfour' element={ <Stepfour/>  }   />
          <Route  path='/register/stepfive' element={ <Stepfive/>  }   />
          <Route  path='*' element={ <NotFound />  }   />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
