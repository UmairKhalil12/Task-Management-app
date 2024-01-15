import { FormLabel, InputAdornment, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import "./LoginPagestyles.css";
import Login from '../../../FireBase/Login';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { blue } from '@mui/material/colors';

function LoginPage() {
    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [Visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setVisible((prev) => !prev);
    };

    const loginHandler = Login({ email: Email, password: Pass });

    const handleLogin = (event) => {
        console.log('email : ', Email, 'pass: ', Pass);
        event.preventDefault();
        loginHandler();
    };

    const forgetPassHandler = (email) => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                window.alert("Password reset email send sucessfully"); 
                console.log("password reset email and successfully"); 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                window.alert('error sending password reset link' , errorMessage);
                console.log('error sending password reset link' , errorMessage)
            });
    }

    return (
        <div className='background-login'>
            <div className='loginContainer'>
                <div className='loginContainer-2'>
                    <form onSubmit={handleLogin}>
                        <FormLabel htmlFor='email' className='formLabel'>Enter your email</FormLabel> <br />
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                )
                            }}
                            id="email"
                            className="custom-textfield"
                            variant="outlined"
                            size='small'
                            value={Email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                        <br /> <br />
                        <FormLabel htmlFor='email' className='formLabel' >Enter your password</FormLabel> <br />
                        <TextField
                            id="password"
                            className="custom-textfield"
                            variant="outlined"
                            type={Visible ? 'text' : 'password'}
                            size='small'
                            value={Pass}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {Visible ? (
                                            <VisibilityIcon onClick={togglePasswordVisibility} />
                                        ) : (
                                            <VisibilityOffIcon onClick={togglePasswordVisibility} />
                                        )}
                                    </InputAdornment>

                                ),
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(event) => { setPass(event.target.value) }}
                        />
                        <br /> <br />
                        <Button
                            variant="outlined"
                            type='submit'
                        >
                            Login
                        </Button>
                        <br/> 
                        <p style={{color : 'blue' , float : 'left'}} onClick={()=> forgetPassHandler(Email) }>Forgot Password ? send pasword reset email</p>
                        <p>Dont have an account?</p> <p style={{ color: 'blue' }} onClick={() => { navigate('/signup') }}>Signup</p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
