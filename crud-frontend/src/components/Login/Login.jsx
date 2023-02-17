import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./Login.css"

function Login({setLoginUser}) {
	let navigate = useNavigate()
	const [name, setName] = useState("")
	const [pwd, setPwd] = useState("")
	const [incorrect, setIncorrect] = useState(false)
	const [validate, setValidate] = useState({
		name: true,
		pwd: true,
	})

	const handleLogin = async () => {
		if (name === "") {
			return setValidate({ name: false })
		}
		if (pwd === "") {
			return setValidate({ pwd: false })
		}
		
		const result = await axios.get(`http://localhost:9090/user/${name}`)
		if (result.data.password === pwd) {
			setLoginUser(result.data.user)
			navigate("/")
		}
		else {
			setIncorrect(true)
		}
	}

	const handleRegister = () => {
		navigate("/register")
	}

	return (
		<div className='login-div'>
			<div className="img">
				<img className='img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8A1UcsMhjhOrX_rWJbJCmJIgqEhAN8Ebz5Q&usqp=CAU" alt="" srcSet="" />
			</div>
			<div className="myform">
				<form className="login-form">
					<div className="login-head">Login</div>
					<p className='check'>
						{
							incorrect ? "Username or Password is incorrect" : ""
						}
					</p>
					<div className="login-name">
						<input className="name" name="name" type="text" placeholder="Enter your name" onChange={(e) => (setName(lastVal => (e.target.value)))} />
						<span className='l-valid'>
							{
								validate.name === false ? "Name is mandatory" : ""
							}
						</span>
					</div>
					<div className="password">
						<input className="pwd" name="password" type="password" placeholder="Enter your password" onChange={(e) => (setPwd(lastVal => (e.target.value)))} />
						<span className='l-valid'>
							{
								validate.pwd === false ? "Password is mandatory" : ""
							}
						</span>
					</div>
					<div className="login-btn-div">
						<input className="login-btn" type="button" value="Login" onClick={handleLogin} />
					</div>
					<div className="register-btn-div">
						<input className="reg-btn" type="button" value="Register" onClick={handleRegister} />
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login