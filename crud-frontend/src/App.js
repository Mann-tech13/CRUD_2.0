import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EmpForm from './components/Employee/EmpForm';
import DepForm from './components/Department/DepForm'
import Sidebar from './components/Sidebar/Sidebar';
import Login from "./components/Login/Login"
import Register from './components/Register/Register';
import './App.css';
{/* <Route exact path="/" element={
              user && user._id ? <Dashboard setLoginUser={user}/> : <AccountLogin setLoginUser={setLoginUser}/>
            }/> */}
function App() {
  const [ user, setUser] = useState("")
  const value = localStorage.getItem('user')
  return (
    <div className='App'>
      <Router>
        {/* {console.log("user", user)} */}
        <Routes>
          {
            value !== null ?
            <Route exact path='/' element={<EmpForm user={user}/>}/> :
            <Route exact path='/' element={user !== "" ? <EmpForm user={user}/>: <Login setUser={setUser}/>} />
          }
          
          <Route exact path='/register' element={<Register/>} />
          {/* <Route exact path='/employees' element={<EmpForm />} /> */}
          <Route exact path='/department' element={<DepForm />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
