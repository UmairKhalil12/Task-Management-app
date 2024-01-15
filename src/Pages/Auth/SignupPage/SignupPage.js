import React from 'react';
import { FormLabel, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Button, InputAdornment } from '@mui/material';
import './SignupPagestyles.css';
import { useState } from 'react';
import Signup from '../../../FireBase/Signup';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import PasswordIcon from '@mui/icons-material/Password';


function SignupPage() {
    const [gender, setGender] = useState('male');
    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [Name, setName] = useState('');
    const [Visible, setVisible] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setVisible((prev) => !prev);
    };

    const SignupHandler = Signup({ email: Email, password: Pass, name: Name, gender: gender });
    const handleSignup = (event) => {
        event.preventDefault();
        SignupHandler();
    }

    return (
        <div className='backgroundSignup'>
            <div className='signUpContainer'>
                <div className='signupContainer-2'>
                    <form onSubmit={handleSignup}>
                        <FormLabel htmlFor='name'>Enter your name</FormLabel> <br />
                        <TextField
                            id='name'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <BadgeIcon />
                                    </InputAdornment>
                                )
                            }}
                            variant='outlined'
                            size='small'
                            className='LabelFields'
                            value={Name}
                            onChange={(event) => { setName(event.target.value) }}
                        /> <br /> <br />

                        <FormLabel htmlFor='gender'>Select your gender</FormLabel> <br />
                        <FormControl component='fieldset'>
                            <RadioGroup
                                aria-label='gender'
                                name='gender'
                                value={gender}
                                onChange={(event) => { setGender(event.target.value) }}
                                row
                            >
                                <FormControlLabel value='female' style={{ color: '#535353' }} control={<Radio style={{ color: 'grey' }} />} label='Female' />
                                <FormControlLabel value='male' style={{ color: '#535353' }} control={<Radio style={{ color: 'grey' }} />} label='Male' />
                                <FormControlLabel value='other' style={{ color: '#535353' }} control={<Radio style={{ color: 'grey' }} />} label='Other' />
                            </RadioGroup>
                        </FormControl>

                        <br /> <br />

                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <EmailIcon />
                                    </InputAdornment>
                                )
                            }}
                            id="email"
                            variant="outlined"
                            size='small'
                            className='LabelFields'
                            value={Email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                        <br /> <br />

                        <FormLabel htmlFor='password'>Enter your password</FormLabel> <br />
                        <TextField
                            id="password"
                            variant="outlined"
                            type={Visible ? 'text' : 'password'}
                            size='small'
                            className='LabelFields'
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
                                    <InputAdornment position='start'>
                                        <PasswordIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(event) => { setPass(event.target.value) }}
                        />

                        <br /> <br />

                        <Button
                            variant='outlined'
                            type='submit'
                        >Signup</Button>
                        <p>Already have an account?</p> <u><p style={{ color: 'blue' }} onClick={() => { navigate('/login') }}>Login</p></u>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
