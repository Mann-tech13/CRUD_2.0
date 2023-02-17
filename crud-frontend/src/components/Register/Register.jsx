import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./Register.css"

function Register() {
  let navigate = useNavigate()
  const [name, setName] = useState("")
  const [pwd, setPwd] = useState("")
  const [validate, setValidate] = useState({
    name: true,
    pwd: true
  })
  let user = {
    name: "",
    pwd: ""
  }
  const handleRegister = async() => {
    if(name === ""){
      return setValidate({name: false})
    }
    else if(pwd === ""){
      return setValidate({pwd: false})
    }
    user = {
      name: name,
      pwd: pwd
    }
    const result = await axios.get(`http://localhost:9090/user/${name}`)
    console.log(result.data);
    if(result.data === ""){
      await axios.post("http://localhost:9090/user", user)
      navigate("/")
    }
    else{
      alert("User already registered")
    }
  } 

  return (
    <div className='register-div'>
			<div className="reg-img">
				<img className='reg-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8A1UcsMhjhOrX_rWJbJCmJIgqEhAN8Ebz5Q&usqp=CAU" alt="" srcSet="" />
			</div>
			<div className="register-myform">
				<form className="register-form">
					<div className="register-head">Register</div>
					<div className="register-name">
						<input className="reg-name" name="name" type="text" placeholder="Enter your name" onChange={(e) => (setName(lastVal => (e.target.value)))} required/>
            <span className='valid'>
              {
                validate.name === false ? "Name is mandatory" : ""
              }
            </span>
					</div>
					<div className="register-password">
						<input className="reg-pwd" name="password" type="password" placeholder="Enter your password" onChange={(e) => (setPwd(lastVal => (e.target.value)))} required/>
            <p className='valid'>
              {
                validate.pwd === false ? "Password is mandatory" : ""
              }
            </p>
					</div>
					<div className="register-btn-div">
						<input className="register-btn" type="button" value="Register" onClick={handleRegister}/>
					</div>
				</form>
			</div>
		</div>
  )
}

export default Register