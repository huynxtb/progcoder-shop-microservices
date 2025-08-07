import React, { useState } from 'react'
import { toast } from 'react-toastify';

const SignUpFormSection = () => {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        if (!userName && !password && !email) {
            toast.error('Please fill out all fields.', { position: 'top-right' });
        } else if (!password) {
            toast.warning('Please provide password.', { position: 'top-right' });
        } else if(!userName){
            toast.warning('Please provide user name.', { position: 'top-right' });
        } else if (!isValidEmail(email) || !email) {
            toast.warning('Please provide a valid email address.', { position: 'top-right' });
        } else {
    
            // If the form is successfully submitted, show a success toast
            toast.success('Registered successfully!', { position: 'top-right' });
            setUserName('');
            setPassword('');
            setEmail('');
        }
      };

    
  return (
    <form action="#" onSubmit={handleFormSubmit}>
        <input 
        type="text" 
        name="register-username" 
        id="register-username" 
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        />
        <input 
        type="email" 
        name="register-email" 
        id="register-email" 
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        type="password" 
        name="register-password" 
        id="register-password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="fz-1-banner-btn single-form-btn">Register</button>
    </form>
  )
}

export default SignUpFormSection