import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FireBase';
import { useNavigate } from 'react-router-dom';

function Login({ email, password }) {
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email === '' && password === '') {
            window.alert('Email and Password are Required!');
        } else if (email === '') {
            window.alert('Email is Required!');
        } else if (password === '') {
            window.alert('Password is Required');
        } else {
            await signInWithEmailAndPassword(auth, email, password)
                .then((cred) => {
                    console.log('User logged in successfully:', cred.user);
                    window.alert('User logged in successfully : ', cred.user.email);

                    if (cred.user.email === 'umairkhalil024@gmail.com') {
                        navigate('/home');
                    } else {
                        navigate('/home');
                    }

                }).catch((err) => {
                    const error = err.message;
                    window.alert(error);
                    console.log(error);
                })
        }
    }
    return handleLogin;
};
export default Login;
