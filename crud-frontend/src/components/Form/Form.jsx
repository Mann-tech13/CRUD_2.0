import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./Form.css"

function Form() {

  const [empId, setEmpId] = useState()
  const [empName, setEmpName] = useState("")
  const [flag, setFlag] = useState("")
  const [depId, setDepId] = useState()

  const [getData, setGetData] = useState([])
  const [getDepartmentData, setGetDepartmentData] = useState([])
  const [len, setLen] = useState(0)

  let emp = {
    employee_id: 0,
    employee_name: "",
    flag: "",
    department_id: 0
  }

  useEffect(() => {
    // console.log("eid is updated")
    // console.log(empId)
  }, [empId])
  useEffect(() => {
    // console.log("depId is updated")
    // console.log(depId)
  }, [depId])
  useEffect(() => {
    // console.log("empName is updated")
    // console.log(empName)
  }, [empName])
  useEffect(() => {
    // console.log("flag is updated")
    // console.log(flag)
  }, [flag])


  const handleClick = async (e) => {
    e.preventDefault()
    console.log(empName)
    if(empId === undefined){
      return alert("Employee Id is empty") 
    }
    else if(empName === ""){
      return alert("Employee Name is empty") 
    }
    else if(flag === undefined || (flag !== "Active" && flag !== "Inactive")){
      return alert("Status is wrong") 
    }
    else if(depId === undefined){
      return alert("Select the department") 
    }
    let method_check = false
    emp = {
      employee_id: empId,
      employee_name: empName,
      flag: flag,
      department_id: depId
    }
    getData.map((rows) => {
      if (rows.employee_id === emp.employee_id) {
        method_check = true
      }
    })
    // console.log(method_check)
    if (!method_check) {
      // console.log("POST invoked")
      await axios.post("http://localhost:9090/employees", emp)
      setGetData([...getData, emp])

    }
    else {
      // console.log("PUT invoked")
      await axios.put("http://localhost:9090/employees", emp)
      setGetData([...getData])
    }
    setEmpId("")
    setEmpName("")
    setFlag("")
    setDepId("")
  }

  const handleDeleteClick = async (e, id) => {
    const result = await axios.delete(`http://localhost:9090/employees/${id}`)
  }

  const handleEditClick = async (e, id) => {
    const result = await axios.get(`http://localhost:9090/employees/${id}`)
    // console.log(result)
    setEmpId(result.data.employee_id)
    setEmpName(result.data.employee_name)
    setFlag(result.data.flag)
    setDepId(result.data.department_id)
  }

  let departmentSelectedId = 0
  const handleDepartmentChange = async (e) => {
    getDepartmentData.map((dep) => {
      if (dep.department_name === e.target.value) {
        departmentSelectedId = dep.department_id
      }
    })
    setDepId(departmentSelectedId)
  }

  useEffect(() => {
    axios.get("http://localhost:9090/department").then((response) => {
      setGetDepartmentData(response.data)
      // console.log(getDepartmentData)
      setLen(response.data.length)
      // console.log(len)
    })
  }, [len])
  useEffect(() => {
    axios.get("http://localhost:9090/employees").then((response) => {
      setGetData(response.data)
    })
  }, [getData])

  return (
    <div className=''>
      <svg id="wave" style={{ transform: 'rotate(180deg)', transition: '0.3s' }} viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stopColor="rgba(190, 180, 200, 1)" offset="0%"></stop><stop stopColor="rgba(151.252, 123.179, 179.325, 1)" offset="100%"></stop></linearGradient></defs><path style={{ transform: 'translate(0, 0)', opacity: '1' }} fill="url(#sw-gradient-0)" d="M0,147L21.8,196C43.6,245,87,343,131,351.2C174.5,359,218,278,262,228.7C305.5,180,349,163,393,138.8C436.4,114,480,82,524,114.3C567.3,147,611,245,655,310.3C698.2,376,742,408,785,375.7C829.1,343,873,245,916,187.8C960,131,1004,114,1047,138.8C1090.9,163,1135,229,1178,228.7C1221.8,229,1265,163,1309,163.3C1352.7,163,1396,229,1440,285.8C1483.6,343,1527,392,1571,416.5C1614.5,441,1658,441,1702,383.8C1745.5,327,1789,212,1833,212.3C1876.4,212,1920,327,1964,318.5C2007.3,310,2051,180,2095,114.3C2138.2,49,2182,49,2225,98C2269.1,147,2313,245,2356,310.3C2400,376,2444,408,2487,383.8C2530.9,359,2575,278,2618,261.3C2661.8,245,2705,294,2749,326.7C2792.7,359,2836,376,2880,318.5C2923.6,261,2967,131,3011,114.3C3054.5,98,3098,196,3120,245L3141.8,294L3141.8,490L3120,490C3098.2,490,3055,490,3011,490C2967.3,490,2924,490,2880,490C2836.4,490,2793,490,2749,490C2705.5,490,2662,490,2618,490C2574.5,490,2531,490,2487,490C2443.6,490,2400,490,2356,490C2312.7,490,2269,490,2225,490C2181.8,490,2138,490,2095,490C2050.9,490,2007,490,1964,490C1920,490,1876,490,1833,490C1789.1,490,1745,490,1702,490C1658.2,490,1615,490,1571,490C1527.3,490,1484,490,1440,490C1396.4,490,1353,490,1309,490C1265.5,490,1222,490,1178,490C1134.5,490,1091,490,1047,490C1003.6,490,960,490,916,490C872.7,490,829,490,785,490C741.8,490,698,490,655,490C610.9,490,567,490,524,490C480,490,436,490,393,490C349.1,490,305,490,262,490C218.2,490,175,490,131,490C87.3,490,44,490,22,490L0,490Z"></path></svg>
      <form action="" className='form' >
        <div className="employee-id">
          <input type="text" name="employee_id" value={empId} placeholder='Employee ID' className='input-field' onChange={(e) => setEmpId(e.target.value)} required />
        </div>
        <div className="employee-name">
          <input type="text" name="employee_name" value={empName} placeholder='Employee Name' className='input-field' onChange={(e) => setEmpName(e.target.value)} />
        </div>
        <div className="employee-status">
          <input type="text" name="flag" value={flag} placeholder='Employee Status' className='input-field' onChange={(e) => setFlag(e.target.value)} />
        </div>
        <div className="department-name">
          <select name="departments" id="" onChange={(e) => handleDepartmentChange(e)} defaultValue="Select your department">
            <option>Select your department</option>
            {
              getDepartmentData.map((department) => {
                return (
                  <option>{department.department_name}</option>
                )
              })
            }
          </select>
        </div>
        {/* <div className="department-id">
          <input type="text" name="department_id" value={depId} placeholder='Department ID' className='input-field' onChange={(e) => setDepId(e.target.value)} />
        </div> */}
        <div className="buttons input-field" >
          <div className="submit">
            <input type="submit" className='submit-btn' onClick={handleClick} />
          </div>
          <div className="clear">
            <input type="button" value="Clear" className='clear-btn' />
          </div>
        </div>
      </form>

      <div className="data">
        <table>
          <thead>
            <tr>
              <th>Employment ID</th>
              <th>Employement Name</th>
              <th>Department Name</th>
              <th>Employement Status</th>
              <th>Update Data</th>
            </tr>
          </thead>
          <tbody>
            {
              getData.map((data) => {
                return (
                  <tr key={data.employee_id}>
                    <td>{data.employee_id}</td>
                    <td>{data.employee_name}</td>
                    <td>
                      {
                        getDepartmentData.map((empDepartment) => {
                          if(empDepartment.department_id === data.department_id){
                            return(
                              empDepartment.department_name
                            )
                          }
                        })
                      }
                    </td>
                    <td>{data.flag}</td>
                    <td><button className="edit" id={data.employee_id} onClick={(e) => handleEditClick(e, data.employee_id)}>✏️</button><button className='delete' id={data.employee_id} onClick={(e) => handleDeleteClick(e, data.employee_id)}>❌</button></td>
                  </tr>
                )
              })

            }
          </tbody>
        </table>
      </div>
      <div className="form-app">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#290748" fillOpacity="0.3" d="M0,128L21.8,133.3C43.6,139,87,149,131,170.7C174.5,192,218,224,262,240C305.5,256,349,256,393,229.3C436.4,203,480,149,524,106.7C567.3,64,611,32,655,64C698.2,96,742,192,785,202.7C829.1,213,873,139,916,133.3C960,128,1004,192,1047,213.3C1090.9,235,1135,213,1178,186.7C1221.8,160,1265,128,1309,133.3C1352.7,139,1396,181,1418,202.7L1440,224L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  )
}

export default Form