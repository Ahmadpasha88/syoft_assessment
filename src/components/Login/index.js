import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../Register/index.css';
import Swal from 'sweetalert2';

export default function Login() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [mailError, setMailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const navigate = useNavigate();

    const isLogedIn = localStorage.getItem('userData');




useEffect(() => {
  if (isLogedIn) {
      navigate('/');
  }
}, [isLogedIn, navigate])

    const mailHandler = (e) => {
        setMail(e);
    };

    const passwordHandler = (e) => {
        setPassword(e);
    };

    const validateMail = () => {
        if (!mail) {
            setMailError('Enter Mail');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(mail)) {
            setMailError('Email address is invalid');
            return false;
        } else {
            setMailError('');
            return true;
        }
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError('Enter Password');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const validate = () => {
        const isMailValid = validateMail();
        const isPasswordValid = validatePassword();
        return isMailValid && isPasswordValid;
    };

    const loginData = {
        user_email: mail,
        user_password: password,
    };

    const submitData = async () => {
        if (validate()) {
            try {
                const response = await fetch('https://syoft.dev/Api/userlogin/api/userlogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });
                const data = await response.json();
                if (response.ok) {
                    if(data.status){
                        Swal.fire({
                            title: 'Good job!',
                            text: 'Login successful!',
                            icon: 'success',
                        });
                        localStorage.setItem('userData', JSON.stringify(data.user_data));
                        navigate('/');

                    }
                    else{
                        Swal.fire({
                            title: 'Error!',
                            text: `User ${data.msg}`,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                          })
                    }
                    
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: `Login failed: ${data.msg}`,
                        icon: 'error',
                        confirmButtonText: 'Ok',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: `Network error: ${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
                console.error('Error during login:', error);
            }
        } else {
            console.log('Form has errors');
        }
    };

    return (
        <div className='row p-0 m-0'>
            <div className='col-12 col-lg-6 h-sm-50 h-xl-100 topContainer'>
                <h1 className='appName'>Bouquets Mart</h1>
            </div>
            <div className='col-12 col-lg-6 registrationContainer'>
                <div className='p-0 m-0 d-flex flex-column justify-content-center'>
                    <h2 className='mt-3 mb-5 fs-1 appName'>Login</h2>
                    <div className='m-3 col-11 m-auto'>
                        <label>Mail</label>
                        <input
                            type='mail'
                            className='border rounded-3 col-12 p-2'
                            value={mail}
                            placeholder='Enter Mail'
                            onChange={(e) => mailHandler(e.target.value)}
                        />
                        <p className='errorMsg'>{mailError}</p>
                    </div>
                    <div className='m-3 col-11 m-auto'>
                        <label>Password</label>
                        <input
                            type='password'
                            className='border rounded-3 col-12 p-2'
                            value={password}
                            placeholder='Enter Password'
                            onChange={(e) => passwordHandler(e.target.value)}
                        />
                        <p className='errorMsg'>{passwordError}</p>
                    </div>
                    <div className='text-center mt-5 mb-2'>
                        <button type='button' className='registerBtn' onClick={submitData}>Login</button>
                    </div>
                    <div className='pb-4'>
                        <p className='text-center fw-bold'>
                            If you don't have an account please{' '}
                            <Link to='/register' className='text-primary text-decoration-underline' role='button'>
                                go to register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
