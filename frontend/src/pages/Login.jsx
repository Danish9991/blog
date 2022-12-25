import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {MDBCard, MDBCardBody, MDBCardFooter,MDBIcon, MDBInput, MDBValidation, MDBBtn, MDBSpinner } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'
import { googleSignIn, login } from '../redux/features/authSlice'
import { GoogleLogin } from 'react-google-login'
import { gapi } from "gapi-script";

const initialState = {
    email : '',
    password : ''
}

const Login = () => {
    const [formValues, setFormvalues] = useState(initialState)
    const {email, password } = formValues

    const { loading, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormvalues({...formValues, [name] : value})
    }

    useEffect(() => {
        console.log(error);
        if(error){
            toast.error(error)
        }
        function start() {
            gapi.client.init({
              clientId: '528496535041-q8taucc9tah1dtk95iodkc986ipen5sj.apps.googleusercontent.com',
              scope: 'email',
            });
          }
          gapi.load('client:auth2', start);
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(email && password){
          dispatch(login({formValues, navigate, toast}))
        }
    }

    const googleSuccess = (resp) => {
        console.log(resp);
        const name = resp?.profileObj.name
        const email = resp?.profileObj.email
        const googleId = resp?.googleId
        const token = resp?.tokenId
        const data = {name, email, googleId, token}
        dispatch(googleSignIn({data, navigate, toast}))
    }
    const googleFailure = (err) => {
        console.log(err);
        toast.error(err);
    }
  return (
    <div  
    style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}>
        <MDBCard alignment='center'>
            <MDBIcon fas icon="user-circle" className="fa-2x" />
            <h5>Sign In</h5>
            <MDBCardBody>
            <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your password"
              />
            </div>
            <div className='col-md-12'>
                <MDBBtn style={{width : '100%'}} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                   Login
                </MDBBtn>
            </div>
            </MDBValidation>
            <br />
            <GoogleLogin
               clientId="528496535041-q8taucc9tah1dtk95iodkc986ipen5sj.apps.googleusercontent.com"
               render={(renderProps) => (
                 <MDBBtn style={{width : '100%'}} 
                    color="danger"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                 >
                    <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                 </MDBBtn>
               )}
               onSuccess={googleSuccess}
               onFailure={googleFailure}
               cookiePolicy={'single_host_origin'}
            />
            </MDBCardBody>
            <MDBCardFooter>
               <Link to='/register'>
                <p>Don't have an account? Sign up</p>
               </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}

export default Login