import React from 'react'
import "./Login.css"

function Login() {
  return (
    <div className='login-div'>
        <form className="login-form">
			<h3 className="login-head">Login</h3>
			<div className="login-name">
				<input className="name" name="name" type="text" placeholder="Enter your name" required/>
			</div>
			<div className="password">
				<input className="pwd" name="password" type="password" placeholder="Enter your password" required/>
			</div>
			<div className="login-btn-div">
				<input className="login-btn" type="submit" value="Login"/>
			</div>
			<div className="register-btn-div">
				<input className="reg-btn" type="submit" value="Register" onclick="form.action='register.jsp'"/>
			</div>
		</form>
    </div>
  )
}

export default Login