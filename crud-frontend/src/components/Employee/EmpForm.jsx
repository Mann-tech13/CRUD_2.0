import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios'
import "./EmpForm.css"

function EmpForm({user}) {

  let dataOnPage = 5

  // cound data
  let ids = 1

  // dependency check for rendering api calls
  const [dependency, setDependency] = useState(false)

  // Pagination values
  const [startfrom, setStartfrom] = useState(0)
  const [endat, setEndat] = useState(5)
  const [pages, setPages] = useState([])

  // Entity of emp
  const [empId, setEmpId] = useState()
  const [empName, setEmpName] = useState("")
  const [flag, setFlag] = useState("Active")

  // Validation
  const [validate, setValidate] = useState({
    emp_name: "",
    flag: "",
    dep_id: ""
  })

  // department id of selected department from dropdown
  const [depId, setDepId] = useState()

  // List of all employees
  const [allImmutableData, setAllImmutableData] = useState([])

  // search value
  const [search, setSearch] = useState("")
  const [searchdepId, setSearchdepId] = useState()
  const [searchDependency, setSearchDependency] = useState(false)

  // filtered list
  const [status, setStatus] = useState("All")

  // to display data on page
  const [getData, setGetData] = useState([])

  // to hold and display department list
  const [getDepartmentData, setGetDepartmentData] = useState([])

  // set length of department list
  const [len, setLen] = useState(0)

  let emp = {
    employee_id: 0,
    employee_name: "",
    flag: "",
    department_id: 0
  }
  useEffect(() => {
    localStorage.setItem('user', user);
}, []);

  useEffect(() => {
    setDependency(lastVal => (lastVal === true ? false : true));
  }, [empId])

  // PUSH | PUT
  const handleClick = async (e) => {
    e.preventDefault()
   
    if (empName === "") {
      return setValidate({ emp_name: null })
    }
    else if (flag === undefined || (flag !== "Active" && flag !== "Inactive")) {
      return setValidate({ flag: null })
    }
    else if (depId === undefined) {
      return setValidate({ dep_id: null })
    }
    // setDependency(lastVal => (dependency === true ? false : true))
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
      setDependency(!dependency)
      setGetData([...getData, emp])
      
    }
    else {
      // console.log("PUT invoked")
      await axios.put("http://localhost:9090/employees", emp)
      setDependency(!dependency)
      setGetData(lastData => ([...getData]))
      // console.log(getData)
    }
    setEmpName("")
    setFlag("")
    setDepId("")
  }

  // DELETE
  const handleDeleteClick = async (e, id) => {
    await axios.delete(`http://localhost:9090/employees/${id}`)
    setDependency(lastVal => (lastVal === true ? false : true))
    setStatus(status)
  }

  // Edit data on form
  const handleEditClick = async (e, id) => {
    const result = await axios.get(`http://localhost:9090/employees/${id}`)
    // console.log(id);
    // console.log(result)
    setEmpId(result.data.employee_id)
    setEmpName(result.data.employee_name)
    setFlag(result.data.flag)
    setDepId(result.data.department_id)
  }

  // Get id of selected department
  let departmentSelectedId = 0
  const handleDepartmentChange = async (e) => {
    getDepartmentData.map((dep) => {
      if (dep.department_name === e.target.value) {
        departmentSelectedId = dep.department_id
      }
    })
    setDepId(departmentSelectedId)
  }

  const handlePaginatedData = (e) => {
    setStartfrom(lastValue => ((e.target.value - 1) * dataOnPage))
    setEndat(lastValue => (((e.target.value - 1) * dataOnPage) + dataOnPage))
  }
  
  const handleFilter = (e) => {
    if (e.target.name === "search") {
      setSearch(e.target.value)
      setSearchDependency(!searchDependency)
    }
    else if (e.target.name === "filter") {
      setStatus(e.target.value)
    }
  }

  const handleFilteredClick = () => {
    if (search === "" && status === "All") {
      setDependency(!dependency)
    }
    else if (search === "" && status !== "All") {
      let filteredData = []
      allImmutableData.map((data) => {
        if (data.flag === status) {
          filteredData.push(data)
        }
      })
      setGetData(filteredData)
      let rem = filteredData.length % dataOnPage
      let nos = Math.floor(filteredData.length / dataOnPage)
      nos = rem === 0 ? nos : nos + 1
      let tempPageHold = []
      for (let i = 1; i <= nos; i++) {
        tempPageHold.push(i)
      }
      setPages(tempPageHold)
    }
    else if (search !== "" && status === "All") {
      let filteredData = []
      if (searchdepId !== 0) {
        allImmutableData.map((data) => {
          if (data.department_id === searchdepId) {
            filteredData.push(data)
          }
        })
      }
      else {
        allImmutableData.map((data) => {
          if (data.employee_name === search) {
            filteredData.push(data)
          }
        })
      }

      if (filteredData.length > 0) {

        setGetData(filteredData)
        let rem = filteredData.length % dataOnPage
        let nos = Math.floor(filteredData.length / dataOnPage)
        nos = rem === 0 ? nos : nos + 1
        let tempPageHold = []
        for (let i = 1; i <= nos; i++) {
          tempPageHold.push(i)
        }
        setPages(tempPageHold)
      }
      // }
    }
    else if (search !== "" && status !== "All") {
      // search | status
      let filteredData = []
      let combinedData = []
      if (searchdepId !== 0) {
        allImmutableData.map((data) => {
          if (data.department_id === searchdepId) {
            filteredData.push(data)
          }
        })
      }
      else {
        allImmutableData.map((data) => {
          if (data.employee_name === search) {
            filteredData.push(data)
          }
        })
      }
      if (filteredData.length > 0) {
        filteredData.map((data) => {
          if (data.flag === status) {
            combinedData.push(data)
          }
        })
        if (combinedData.length > 0) {
          setGetData(combinedData)
          let rem = combinedData.length % dataOnPage
          let nos = Math.floor(combinedData.length / dataOnPage)
          nos = rem === 0 ? nos : nos + 1
          let tempPageHold = []
          for (let i = 1; i <= nos; i++) {
            tempPageHold.push(i)
          }
          setPages(tempPageHold)
        }
        else {
          setGetData(filteredData)
        }
      }
      else {
        setGetData(allImmutableData)
      }
    }
  }

  const handleClearClick = () => {
    setEmpName("")
    setFlag("")
    setDepId("")
  }

  useEffect(() => {
    getDepartmentData.map((dep) => {
      if (dep.department_name === search) {
        departmentSelectedId = dep.department_id
      }
    })
    setSearchdepId(departmentSelectedId)
  }, [searchDependency])



  useEffect(() => {
    axios.get("http://localhost:9090/department").then((response) => {
      setGetDepartmentData(response.data)
      setLen(response.data.length)
    })
  }, [len])

  //  Getall employees 
  useEffect(() => {
    // const getEmployees = async() => {

    axios.get("http://localhost:9090/employees").then((response) => {
      // setGetData(response.data)
      setGetData(response.data)
      setAllImmutableData(response.data)




      // console.log(slicedData)
      let rem = response.data.length % dataOnPage
      let nos = Math.floor(response.data.length / dataOnPage)
      nos = rem === 0 ? nos : nos + 1
      let tempPageHold = []
      for (let i = 1; i <= nos; i++) {
        tempPageHold.push(i)
      }
      setPages(tempPageHold)

    })
    // }
    // getEmployees()
  }, [dependency])



  return (
    <>
    <Sidebar/>
    <div className='content'>
      <form action="" className='form' >
        <div className="employee-name">
          <input type="text" name="employee_name" value={empName} placeholder='Employee Name' className='input-field input' onChange={(e) => setEmpName(lastValue => (e.target.value))} />
          <span className='validate'>
            {
              validate.emp_name === null ? "Employee Name is mandatory" : ""
            }
          </span>
        </div>
        <div className="employee-status">
          <select name="flag" id="" className='input-field input' onChange={(e) => setFlag(lastValue => (e.target.value))}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <span className='validate'>
            {
              validate.flag === null ? "Employee Status is mandatory" : ""
            }
          </span>
        </div>
        <div className="department-name">
          <select className='select-department' name="departments" id="" onChange={(e) => handleDepartmentChange(e)} defaultValue="Select your department">
            <option>Select your department</option>
            {
              getDepartmentData.map((department) => {
                return (
                  <option>{department.department_name}</option>
                )
              })
            }
          </select>
          <span className='validate'>
            {
              validate.dep_id === null ? "Department cannot be null" : ""
            }
          </span>
        </div>

        <div className="buttons input-field" >
          <div className="submit">
            <input type="submit" className='submit-btn input' onClick={handleClick} />
          </div>
          <div className="clear">
            <input type="button" value="Clear" className='clear-btn input' onClick={handleClearClick}/>
          </div>
        </div>
      </form>

      <div className="filter">
        <div className="searching">
          <input type="search" name="search" className='search' id="" onChange={(e) => handleFilter(e)} />
          <input type="button" value="search" className='search-btn' onClick={handleFilteredClick} />

        </div>
        <div className="filtering">

          <select name="filter" id="" className='status' onChange={(e) => handleFilter(e)}>
            <option value="All" selected>All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input type="button" value="Apply" className='apply-btn' onClick={handleFilteredClick} />
        </div>
      </div>

      <div className="data">
        <table className='table'>
          <thead>
            <tr>
              <th className='th'>Employment ID</th>
              <th className='th'>Employement Name</th>
              <th className='th'>Department Name</th>
              <th className='th'>Employement Status</th>
              <th className='th'>Update Data</th>
            </tr>
          </thead>
          <tbody>
            {
              getData.slice(startfrom, endat).map((data) => {
                return (
                  <tr className="tr" key={data.employee_id}>
                    <td className='td'>{ids++}</td>
                    <td className='td'>{data.employee_name}</td>
                    <td className='td'>
                      {
                        getDepartmentData.map((empDepartment) => {
                          if (empDepartment.department_id === data.department_id) {
                            return (
                              empDepartment.department_name
                            )
                          }
                        })
                      }
                    </td>
                    <td className='td'>{data.flag}</td>
                    <td className='td'><button className="edit" id={data.employee_id} onClick={(e) => handleEditClick(e, data.employee_id)}>✏️</button><button className='delete' id={data.employee_id} onClick={(e) => handleDeleteClick(e, data.employee_id)}>❌</button></td>
                  </tr>
                )
              })

            }
          </tbody>
        </table>
      </div>



      <table className="pagination">
        <thead>
          <tr>
            {
              pages.map((page) => {
                return (
                  <th><input type="button" value={page} className="pages" onClick={(e) => handlePaginatedData(e)} /></th>
                )
              })
            }
          </tr>
        </thead>
      </table>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#290748" fillOpacity="0.3" d="M0,128L21.8,133.3C43.6,139,87,149,131,170.7C174.5,192,218,224,262,240C305.5,256,349,256,393,229.3C436.4,203,480,149,524,106.7C567.3,64,611,32,655,64C698.2,96,742,192,785,202.7C829.1,213,873,139,916,133.3C960,128,1004,192,1047,213.3C1090.9,235,1135,213,1178,186.7C1221.8,160,1265,128,1309,133.3C1352.7,139,1396,181,1418,202.7L1440,224L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
      </svg>
    </div>
    </>
  )
}

export default EmpForm