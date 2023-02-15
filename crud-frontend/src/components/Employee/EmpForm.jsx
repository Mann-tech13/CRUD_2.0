import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./EmpForm.css"

function EmpForm() {
  let dataOnPage = 5

  // dependency check for rendering api calls
  const [dependency, setDependency] = useState(false)

  // Pagination values
  const [startfrom, setStartfrom] = useState(0)
  const [endat, setEndat] = useState(5)
  const [pages, setPages] = useState([])

  // Entity of emp
  const [empId, setEmpId] = useState()
  const [empName, setEmpName] = useState("")
  const [flag, setFlag] = useState("")

  // department id of selected department from dropdown
  const [depId, setDepId] = useState()

  // List of all employees
  const [allImmutableData, setAllImmutableData] = useState([])

  // search value
  const [search, setSearch] = useState("")
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
    setDependency(lastVal => (lastVal === true ? false : true));
  }, [empId])

  // PUSH | PUT
  const handleClick = async (e) => {
    e.preventDefault()
    console.log(empName)
    if (empId === undefined) {
      return alert("Employee Id is empty")
    }
    else if (empName === "") {
      return alert("Employee Name is empty")
    }
    else if (flag === undefined || (flag !== "Active" && flag !== "Inactive")) {
      return alert("Status is wrong")
    }
    else if (depId === undefined) {
      return alert("Select the department")
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
      setGetData([...getData, emp])

    }
    else {
      // console.log("PUT invoked")
      await axios.put("http://localhost:9090/employees", emp)
      setGetData(lastData => ([...getData]))
      // console.log(getData)
    }
    setEmpId("")
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

  // const handleStatusChange = (e) => {
  //   setStatus(e.target.value)
  //   setGetData(allImmutableData)
  // }

  useEffect(() => {
    getDepartmentData.map((dep) => {
      if (dep.department_name === search) {
        departmentSelectedId = dep.department_id
      }
    })
    setDepId(lastVal => departmentSelectedId)
  }, [searchDependency])
  // const handleSearch = (e) => {
  //   let filteredData = []
  //   if(search !== ""){
  //     allImmutableData.map((searchedVal) => {
  //       if(searchedVal.employee_name === search || searchedVal.department_id === depId){
  //         filteredData.push(searchedVal)
  //       }
  //     })
  //     setGetData(filteredData)
  //     let rem = filteredData.length % dataOnPage
  //     let nos = Math.floor(filteredData.length / dataOnPage)
  //     nos = rem === 0 ? nos : nos + 1
  //     let tempPageHold = []
  //     for (let i = 1; i <= nos; i++) {
  //       tempPageHold.push(i)
  //     }
  //     setPages(tempPageHold)
  //   }
  // }

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
      if(search !== 0 || search !== "0"){

      }
    }
    else if (search !== "" && status !== "All") {

    }
  }

  // const handleInputStates = (e) => {
  //   setSearch(lastSearch => (e.target.value))
  //   setSearchDependency(!searchDependency)
  // }

  // useEffect(() => {
  //   if (status !== "All") {
  //     let filteredData = []
  //     if(search === ""){
  //       // console.log(search);
  //       allImmutableData.map((data) => {
  //         if (data.flag === status) {
  //           filteredData.push(data)
  //         }
  //       })
  //     }
  //     else{
  //       // console.log(getData);
  //       getData.map((data) => {
  //         if (data.flag === status) {
  //           filteredData.push(data)
  //         }
  //       })
  //     }
  //     setGetData(filteredData)
  //     let rem = filteredData.length % dataOnPage
  //     let nos = Math.floor(filteredData.length / dataOnPage)
  //     nos = rem === 0 ? nos : nos + 1
  //     let tempPageHold = []
  //     for (let i = 1; i <= nos; i++) {
  //       tempPageHold.push(i)
  //     }
  //     setPages(tempPageHold)
  //   }
  //   else {
  //     setGetData(allImmutableData)
  //   }

  // }, [status])

  // Getall departments


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
      let nos = Math.floor(response.data.length / dataOnPage) + 1
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
    <div className='content'>
      <svg id="wave" style={{ transform: 'rotate(180deg)', transition: '0.3s' }} viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stopColor="rgba(190, 180, 200, 1)" offset="0%"></stop><stop stopColor="rgba(151.252, 123.179, 179.325, 1)" offset="100%"></stop></linearGradient></defs><path style={{ transform: 'translate(0, 0)', opacity: '1' }} fill="url(#sw-gradient-0)" d="M0,147L21.8,196C43.6,245,87,343,131,351.2C174.5,359,218,278,262,228.7C305.5,180,349,163,393,138.8C436.4,114,480,82,524,114.3C567.3,147,611,245,655,310.3C698.2,376,742,408,785,375.7C829.1,343,873,245,916,187.8C960,131,1004,114,1047,138.8C1090.9,163,1135,229,1178,228.7C1221.8,229,1265,163,1309,163.3C1352.7,163,1396,229,1440,285.8C1483.6,343,1527,392,1571,416.5C1614.5,441,1658,441,1702,383.8C1745.5,327,1789,212,1833,212.3C1876.4,212,1920,327,1964,318.5C2007.3,310,2051,180,2095,114.3C2138.2,49,2182,49,2225,98C2269.1,147,2313,245,2356,310.3C2400,376,2444,408,2487,383.8C2530.9,359,2575,278,2618,261.3C2661.8,245,2705,294,2749,326.7C2792.7,359,2836,376,2880,318.5C2923.6,261,2967,131,3011,114.3C3054.5,98,3098,196,3120,245L3141.8,294L3141.8,490L3120,490C3098.2,490,3055,490,3011,490C2967.3,490,2924,490,2880,490C2836.4,490,2793,490,2749,490C2705.5,490,2662,490,2618,490C2574.5,490,2531,490,2487,490C2443.6,490,2400,490,2356,490C2312.7,490,2269,490,2225,490C2181.8,490,2138,490,2095,490C2050.9,490,2007,490,1964,490C1920,490,1876,490,1833,490C1789.1,490,1745,490,1702,490C1658.2,490,1615,490,1571,490C1527.3,490,1484,490,1440,490C1396.4,490,1353,490,1309,490C1265.5,490,1222,490,1178,490C1134.5,490,1091,490,1047,490C1003.6,490,960,490,916,490C872.7,490,829,490,785,490C741.8,490,698,490,655,490C610.9,490,567,490,524,490C480,490,436,490,393,490C349.1,490,305,490,262,490C218.2,490,175,490,131,490C87.3,490,44,490,22,490L0,490Z"></path></svg>
      <form action="" className='form' >
        <div className="employee-id">
          <input type="text" name="employee_id" value={empId} placeholder='Employee ID' className='input-field input' onChange={(e) => setEmpId(lastValue => (e.target.value))} required />
        </div>
        <div className="employee-name">
          <input type="text" name="employee_name" value={empName} placeholder='Employee Name' className='input-field input' onChange={(e) => setEmpName(lastValue => (e.target.value))} />
        </div>
        <div className="employee-status">
          <input type="text" name="flag" value={flag} placeholder='Employee Status' className='input-field input' onChange={(e) => setFlag(lastValue => (e.target.value))} />
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
        </div>

        <div className="buttons input-field" >
          <div className="submit">
            <input type="submit" className='submit-btn input' onClick={handleClick} />
          </div>
          <div className="clear">
            <input type="button" value="Clear" className='clear-btn input' />
          </div>
        </div>
      </form>
      {/* onChange={(e) => handleInputStates(e)}
      onClick={handleSearch}
      onChange={(e) => handleStatusChange(e)} */}
      <div className="filter">
        <input type="search" name="search" id="" onChange={(e) => handleFilter(e)} />
        <input type="button" value="search" onClick={handleFilteredClick} />
        <select name="filter" id="" className='status' onChange={(e) => handleFilter(e)}>
          <option value="All" selected>All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input type="button" value="Apply" onClick={handleFilteredClick} />
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
                    <td className='td'>{data.employee_id}</td>
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

      {/* <div className="search">
        <input type="search" name="search" id="" placeholder='Search by Id'/>
      </div> */}



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
  )
}

export default EmpForm