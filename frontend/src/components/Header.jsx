import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { setLogout } from '../redux/features/authSlice';

export default function App() {
  const [showNavSecond, setShowNavSecond] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)

  const logoutHandler = () => {
    dispatch(setLogout())
  }
  return (
    <MDBNavbar expand='lg' dark bgColor='dark'>
      <MDBContainer fluid className='container'>
        <Link to='/'>
        <MDBNavbarBrand>Blog App</MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavSecond(!showNavSecond)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavSecond}>
          <MDBNavbarNav >
          <Link to='/' className='ms-auto'>
            <MDBNavbarLink >
              Home
            </MDBNavbarLink>
          </Link>
          {user?.id ? (
            <>
            <Link to='/addTour'>
            <MDBNavbarLink >
              Add tour
            </MDBNavbarLink>
            </Link>
            <Link to='/dashboard'>
            <MDBNavbarLink >
              Dashboard
            </MDBNavbarLink>
            </Link>
            <Link to='/login' onClick={logoutHandler}>
            <MDBNavbarLink >logout</MDBNavbarLink>
            </Link>
            </>
          ) : (
            <Link to='/login'>
            <MDBNavbarLink >Login</MDBNavbarLink>
            </Link>
          )
          }
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}