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
        <div className='dep-field'>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">

                    <path fill="#d9a1c0" fill-opacity="1" d="M0,192L11.4,202.7C22.9,213,46,235,69,224C91.4,213,114,171,137,170.7C160,171,183,213,206,192C228.6,171,251,85,274,85.3C297.1,85,320,171,343,186.7C365.7,203,389,149,411,138.7C434.3,128,457,160,480,160C502.9,160,526,128,549,117.3C571.4,107,594,117,617,128C640,139,663,149,686,176C708.6,203,731,245,754,224C777.1,203,800,117,823,69.3C845.7,21,869,11,891,48C914.3,85,937,171,960,186.7C982.9,203,1006,149,1029,117.3C1051.4,85,1074,75,1097,64C1120,53,1143,43,1166,80C1188.6,117,1211,203,1234,234.7C1257.1,267,1280,245,1303,213.3C1325.7,181,1349,139,1371,101.3C1394.3,64,1417,32,1429,16L1440,0L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"></path>
                </svg>
                <path fill="#a2d9ff" fill-opacity="1" d="M0,160L15,170.7C30,181,60,203,90,224C120,245,150,267,180,250.7C210,235,240,181,270,149.3C300,117,330,107,360,85.3C390,64,420,32,450,37.3C480,43,510,85,540,133.3C570,181,600,235,630,234.7C660,235,690,181,720,181.3C750,181,780,235,810,245.3C840,256,870,224,900,213.3C930,203,960,213,990,213.3C1020,213,1050,203,1080,186.7C1110,171,1140,149,1170,133.3C1200,117,1230,107,1260,106.7C1290,107,1320,117,1350,144C1380,171,1410,213,1425,234.7L1440,256L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"></path></svg>

        </div>
    )
}

export default DepForm