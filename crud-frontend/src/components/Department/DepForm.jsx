import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./DepForm.css"

function DepForm() {
    const [dependency, setDependency] = useState(false)
    const [depId, setDepId] = useState()
    const [depName, setDepName] = useState("")
    const [flag, setFlag] = useState("")

    const [getDep, setGetDep] = useState([])

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

        if (depId === undefined) {
            return alert("Department Id is empty")
        }
        else if (depName === "") {
            return alert("Department Name is empty")
        }
        else if (flag === undefined || (flag !== "Active" && flag !== "Inactive")) {
            return alert("Status is wrong")
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
        setDepId("")
        setDepName("")
        setFlag("")
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

    useEffect(() => {
        // const getEmployees = async() => {

        axios.get("http://localhost:9090/department").then((response) => {
            setGetDep(response.data)
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
        <div>
            <form action="" className='d-form'>
                <div className="department-id">
                    <input type="text" name="department_id" value={depId} placeholder='Department ID' className='d-input-field d-input' onChange={(e) => setDepId(lastValue => (e.target.value))} required />
                </div>
                <div className="department-name">
                    <input type="text" name="department_name" value={depName} placeholder='Department Name' className='d-input-field d-input' onChange={(e) => setDepName(lastValue => (e.target.value))} />
                </div>
                <div className="department-status">
                    <input type="text" name="flag" value={flag} placeholder='Department Status' className='d-input-field d-input' onChange={(e) => setFlag(lastValue => (e.target.value))} />
                </div>
                <div className="d-buttons d-input-field" >
                    <div className="d-submit">
                        <input type="submit" className='d-submit-btn d-input' onClick={(e) => handleClick(e)} />
                    </div>
                    <div className="d-clear">
                        <input type="button" value="Clear" className='d-clear-btn d-input' />
                    </div>
                </div>
            </form>
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
            <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 690" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stopColor="#F78DA7"></stop><stop offset="95%" stopColor="#8ED1FC"></stop></linearGradient></defs><path d="M 0,700 C 0,700 0,233 0,233 C 48.85537615939539,197.08588114050156 97.71075231879078,161.17176228100308 168,193 C 238.28924768120922,224.82823771899692 330.0123668842322,324.39883201648917 410,311 C 489.9876331157678,297.60116798351083 558.2397801442802,171.23290965304017 633,159 C 707.7602198557198,146.76709034695983 789.0285125386466,248.6695293713501 853,267 C 916.9714874613534,285.3304706286499 963.6461697011337,220.08897286155963 1033,218 C 1102.3538302988663,215.91102713844037 1194.386808656819,276.9745791824115 1266,290 C 1337.613191343181,303.0254208175885 1388.8065956715905,268.01271040879425 1440,233 C 1440,233 1440,700 1440,700 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stopColor="#F78DA7"></stop><stop offset="95%" stopColor="#8ED1FC"></stop></linearGradient></defs><path d="M 0,700 C 0,700 0,466 0,466 C 62.59361044314667,479.9725180350395 125.18722088629335,493.945036070079 195,494 C 264.81277911370665,494.054963929921 341.8447268979732,480.1923737547234 412,454 C 482.1552731020268,427.8076262452766 545.4338715218138,389.2854689110271 613,417 C 680.5661284781862,444.7145310889729 752.4197870147715,538.6657506011679 818,546 C 883.5802129852285,553.3342493988321 942.8869804191002,474.0515286843009 1020,432 C 1097.1130195808998,389.9484713156991 1192.0322913088285,385.1281346616283 1265,397 C 1337.9677086911715,408.8718653383717 1388.9838543455858,437.43593266918583 1440,466 C 1440,466 1440,700 1440,700 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
        </div>
    )
}

export default DepForm