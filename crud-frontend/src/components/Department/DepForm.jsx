import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios';
import "./DepForm.css"

function DepForm() {
    // dependency to get all department
    const [dependency, setDependency] = useState(false)

    // Validation
    const [validate, setValidate] = useState({
        dep_name: "",
        flag: "",
    })

    // to store all department values 
    const [depId, setDepId] = useState()
    const [depName, setDepName] = useState("")
    const [flag, setFlag] = useState("Active")

    // dissplay all departments
    const [getDep, setGetDep] = useState([])
    const [allImmutableData, setAllImmutableData] = useState([])

    // filters
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("All")


    // Pagination
    let dataOnPage = 5
    const [startfrom, setStartfrom] = useState(0)
    const [endat, setEndat] = useState(5)
    const [pages, setPages] = useState([])
    let dep = {
        department_id: 0,
        department_name: "",
        flag: "",
    }

    useEffect(() => {
        setDependency(lastVal => (lastVal === true ? false : true));
    }, [depId])

    const handleClick = async (e) => {
        e.preventDefault()
        if (depName === "") {
            return setValidate({ dep_name: null })
        }
        else if (flag === undefined || (flag !== "Active" && flag !== "Inactive")) {
            return setValidate({ flag: null })
        }
        let method_check = false
        dep = {
            department_id: depId,
            department_name: depName,
            flag: flag
        }
        getDep.map((rows) => {
            if (rows.department_id === dep.department_id) {
                method_check = true
            }
        })
        if (!method_check) {

            await axios.post("http://localhost:9090/department", dep)
            setGetDep([...getDep, dep])
        }
        else {
            await axios.put("http://localhost:9090/department", dep)
            setGetDep(lastData => ([...getDep]))
        }

    }

    const handleEditClick = async (e, id) => {
        const result = await axios.get(`http://localhost:9090/department/${id}`)
        setDepId(result.data.department_id)
        setDepName(result.data.department_name)
        setFlag(result.data.flag)

    }

    const handleDeleteClick = async (e, id) => {
        await axios.delete(`http://localhost:9090/department/${id}`)
        setDependency(lastVal => (lastVal === true ? false : true))
    }

    const handlePaginatedData = (e) => {
        setStartfrom(lastValue => ((e.target.value - 1) * dataOnPage))
        setEndat(lastValue => (((e.target.value - 1) * dataOnPage) + dataOnPage))
    }

    const handleFilter = (e) => {
        if (e.target.name === "filter") {
            setStatus(e.target.value)
            // console.log("HI");
        }
        else if (e.target.name === "search") {
            setSearch(e.target.value)
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
            setGetDep(filteredData)
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
            allImmutableData.map((data) => {
                if (data.department_name === search) {
                    filteredData.push(data)
                }
            })
            if (filteredData.length > 0) {
                setGetDep(filteredData)
            }
            else {
                setDependency(!dependency)
            }
        }
        else if (search !== "" && status !== "All") {
            let filteredData = []
            let combinedData = []

            allImmutableData.map((data) => {
                if (data.department_name === search) {
                    filteredData.push(data)
                }
            })
            if (filteredData.length > 0) {
                filteredData.map((data) => {
                    if (data.flag === status) {
                        combinedData.push(data)
                    }
                })
                if (combinedData.length > 0) {

                    setGetDep(combinedData)
                }
            }
            else {
                allImmutableData.map((data) => {
                    if (data.flag === status) {
                        filteredData.push(data)
                    }
                })
                if (filteredData.length > 0) {
                    setGetDep(filteredData)
                }
                else {
                    setGetDep(allImmutableData)
                }
            }
        }
    }

    const handleClearClick = () => {
        setDepName("")
        setFlag("")
    }

    useEffect(() => {
        // const getEmployees = async() => {

        axios.get("http://localhost:9090/department").then((response) => {
            setGetDep(response.data)
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
            <Sidebar />
            <div className='dep-field'>
                <form action="" className='d-form'>

                    <div className="department-name">
                        <input type="text" name="department_name" value={depName} placeholder='Department Name' className='d-input-field d-input' onChange={(e) => setDepName(lastValue => (e.target.value))} />
                        <span className='validate'>
                            {
                                validate.dep_name === null ? "Department Name is mandatory" : ""
                            }
                        </span>
                    </div>
                    <div className="department-status">

                        <select name="flag" id="" className='d-input-field d-input' onChange={(e) => setFlag(lastValue => (e.target.value))}>
                            <option value="Active" selected>Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="d-buttons d-input-field" >
                        <div className="d-submit">
                            <input type="submit" className='d-submit-btn d-input' onClick={(e) => handleClick(e)} />
                        </div>
                        <div className="d-clear">
                            <input type="button" value="Clear" className='d-clear-btn d-input' onClick={(e) => handleClearClick(e)} />
                        </div>
                    </div>
                </form>

                <div className="d-filter">
                    <div className="d-searching">
                        <input type="search" name="search" className='d-search' id="" onChange={(e) => handleFilter(e)} />
                        <input type="button" value="search" className='d-search-btn' onClick={handleFilteredClick} />

                    </div>
                    <div className="d-filtering">

                        <select name="filter" id="" className='d-status' onChange={(e) => handleFilter(e)}>
                            <option value="All" selected>All</option>
                            <option value="Active" >Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <input type="button" value="Apply" className='d-apply-btn' onClick={handleFilteredClick} />
                    </div>
                </div>

                <div className="d-data">
                    <table className='d-table'>
                        <thead>
                            <tr>
                                <th className='d-th'>Department ID</th>
                                <th className='d-th'>Department Name</th>
                                <th className='d-th'>Department Status</th>
                                <th className='d-th'>Update Deparmt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getDep.slice(startfrom, endat).map((department) => {
                                    return (
                                        <tr className='d-tr'>
                                            <td className='d-td'>{department.department_id}</td>
                                            <td className='d-td'>{department.department_name}</td>
                                            <td className='d-td'>{department.flag}</td>
                                            <td className='d-td'><button className='d-edit' onClick={(e) => handleEditClick(e, department.department_id)}>✏️</button><button className='d-delete' onClick={(e) => handleDeleteClick(e, department.department_id)}>❌</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <table className="d-pagination">
                        <thead>
                            <tr>
                                {
                                    pages.map((page) => {
                                        return (
                                            <th><input type="button" value={page} className="d-pages" onClick={(e) => handlePaginatedData(e)} /></th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                    </table>

                </div>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">

                    <path fill="#d9a1c0" fill-opacity="1" d="M0,192L11.4,202.7C22.9,213,46,235,69,224C91.4,213,114,171,137,170.7C160,171,183,213,206,192C228.6,171,251,85,274,85.3C297.1,85,320,171,343,186.7C365.7,203,389,149,411,138.7C434.3,128,457,160,480,160C502.9,160,526,128,549,117.3C571.4,107,594,117,617,128C640,139,663,149,686,176C708.6,203,731,245,754,224C777.1,203,800,117,823,69.3C845.7,21,869,11,891,48C914.3,85,937,171,960,186.7C982.9,203,1006,149,1029,117.3C1051.4,85,1074,75,1097,64C1120,53,1143,43,1166,80C1188.6,117,1211,203,1234,234.7C1257.1,267,1280,245,1303,213.3C1325.7,181,1349,139,1371,101.3C1394.3,64,1417,32,1429,16L1440,0L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"></path>
                </svg>


            </div>
        </>
    )
}

export default DepForm