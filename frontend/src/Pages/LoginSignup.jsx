import React, { useState } from 'react' 
import './CSS/LoginSignup.css'



const LoginSignup =()=>{

    const [state,setState] = useState("Login");
    const [formData,setFormData]=useState({
        username:"",
        password:"",
        email:"" 
    })
    
    const login = async () => {
        console.log("Login Function Executed", formData);
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const responseData = await response.json();
            console.log("Response Data:", responseData);
    
            if (response.ok && responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                console.error("Login request failed:", responseData.errors);
                alert(responseData.errors || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            alert("Login request failed. Please try again.");
        }
    };
    

    const signup = async () => {
        console.log("Signup Function Executed", formData);
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const responseData = await response.json();
            console.log("Response Data:", responseData);
    
            if (response.ok && responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                console.error("Signup request failed:", responseData.error);
                alert(responseData.error || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("An error occurred during signup:", error);
            alert("Signup request failed. Please try again.");
        }
    };
    
    
    
    

    const changeHandler =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})

    }



    return(

        <div className='loginsignup'>  
        <div className="loginsignup-container">
            <h1>{state}</h1>
            <div className="loginsignup-fields">
              {state==="Sign Up"? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}
                <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address'/>
                <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password'/>

            </div>

            <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
            {state==="Sign Up"?
            <p className="loginsignup-login">Already have an account?<span onClick={()=>{setState("Login")}}>Login here</span></p> 
            :<p className="loginsignup-login">Create an account<span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
            
            
            <div className="loginsignup-agree">
                <input type="checkbox" name='' id='' />
                <p>By continuing, i agree to the terms of use of privacy and policy.</p>
            </div>
        </div>

        </div>
    )
}
export default LoginSignup