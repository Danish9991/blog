import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header'
import {setUser} from './redux/features/authSlice'
import {useDispatch} from 'react-redux'
import AddEditTour from './pages/AddEditTour';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
function App() {
const dispatch = useDispatch();
useEffect(() => {
  const user = JSON.parse(localStorage.getItem('profile'))
  dispatch(setUser(user))
});
  return (
    <div >
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addTour' element={<PrivateRoute> <AddEditTour /> </PrivateRoute>} />
          <Route path='/editTour/:id' element={<PrivateRoute> <AddEditTour /> </PrivateRoute>} />
          <Route path='/tour/:id' element={<SingleTour />} />
          <Route path='/dashboard' element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
