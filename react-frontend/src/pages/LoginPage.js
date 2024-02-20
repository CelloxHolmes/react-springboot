import react,{useState} from 'react';
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';
import './loginpage.css';
import {userLogin} from '../api/authenticationService';
import {Alert,Spinner} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const LoginPage=({loading,error,...props})=>{


    const [values, setValues] = useState({
        userName: '',
        password: ''
        });

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        userLogin(values).then((response)=>{

            console.log("response",response);
            if(response.status===200){
                const token = response.data.token; // Assuming the token is in response.data.token
                localStorage.setItem('token', token); // Store token in local storage
                props.setUser(response.data);
                props.history.push('/employees');
            }
            else{
               props.loginFailure('Something Wrong!Please Try Again'); 
            }


        }).catch((err)=>{

            if(err && err.response){
            
            switch(err.response.status){
                case 401:
                    console.log("401 status");
                    props.loginFailure("Authentication Failed.Bad Credentials");
                    break;
                default:
                    props.loginFailure('Something Wrong!Please Try Again'); 

            }

            }
            else{
                props.loginFailure('Something Wrong!Please Try Again');
            }
                

            

        });
        //console.log("Loading again",loading);

        
    }

    const history = useHistory(); // Correctly getting the history object here

    const handleCreateAccount = () => {
        // Use the history object obtained from useHistory
        history.push('/register');
    };


    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
        ...values,
        [e.target.name]: e.target.value
        }));
    };

    console.log("Loading ",loading);

    return (
        <div className="login-page">
                   
              
                                            
        <section className="h-100">
        <div className="container h-100">
       
            <div className="row justify-content-md-center h-100">
                <div className="card-wrapper">

                    <div className="card fat">
                        <div className="card-body">
                            <h4 className="card-title">Login</h4>
                            
                            <form className="my-login-validation" onSubmit={handleSubmit} noValidate={false}>
                                <div className="form-group">
                                    <label htmlFor="email">User Name</label>
                                    <input id="username" type="text" className="form-control" minLength={5} value={values.userName} onChange={handleChange} name="userName" required />
                                    
                                        <div className="invalid-feedback">
                                            UserId is invalid
                                        </div>
                                    
                                    
                                    
                                </div>

                                <div className="form-group">
                                    <label>Password
                                        <a href="forgot.html" className="float-right">
                                            Forgot Password?
                                        </a>
                                    </label>
                                    <input id="password" type="password" className="form-control" minLength={8} value={values.password} onChange={handleChange} name="password" required/>
                                    <div className="invalid-feedback">
                                        Password is required
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                     </div>
                                </div>


                                <div className="form-group m-0 d-flex justify-content-between align-items-center">
                                    <button type="submit" className="btn btn-primary mr-2">
                                        Login
                                        {loading && (
                                            <Spinner as="span" animation="border" size="sm" role="status"
                                                     aria-hidden="true"/>
                                        )}
                                    </button>
                                    <button type="button" className="btn btn-success ml-2"
                                            onClick={handleCreateAccount}>
                                        Create New Account
                                    </button>
                                </div>
                            </form>
                            {error &&
                                <Alert style={{marginTop: '20px'}} variant="danger">
                                    {error}
                                </Alert>

                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        </div>
    )


}

const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        loading:auth.loading,
        error:auth.error
}}


const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);