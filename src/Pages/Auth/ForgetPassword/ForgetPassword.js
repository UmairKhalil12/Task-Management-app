import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { FormLabel, InputAdornment, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import "./ForgetPassword.css";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const navigate = useNavigate();
    const forgetPassHandler = (email ) => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                window.alert("Password reset email send sucessfully"); 
                console.log("password reset email and successfully"); 
                navigate('/login'); 
            })
            .catch((error) => {
                const errorMessage = error.message;
                window.alert('error sending password reset link' , errorMessage);
                console.log('error sending password reset link' , errorMessage)
            });
    }

    const [Email, setEmail] = useState('');
    return (
        <div className="backgroundForgePass">
            <div className="forgetPassForm">
                <div className="formForgetPass">
                    <form onClick={(event)=>{event.preventDefault()}}>
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
                        <Button
                            variant="outlined"
                            type='submit'
                            onClick={()=>forgetPassHandler(Email )}
                        >
                            Send Password Reset Email 
                        </Button>
                        <p style={{color : 'blue'}} onClick={()=> navigate('/login')}>Login Page</p>
                    </form>
                </div>
            </div>
        </div>

    );
}