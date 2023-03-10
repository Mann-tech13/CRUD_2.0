import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import "./Sidebar.css"

function Sidebar() {
    let navigate = useNavigate()
    const localActive = localStorage.getItem('active');
    const [bool, setBool] = useState(false)
    const [menuCollapse, setMenuCollapse] = useState(false)
    const [activepage, setActivepage] = useState(
        JSON.parse(localActive)
    )
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    const handleEmpClick = (e) => {
        setActivepage({
            emp: true,
            dep: false
        })
        setBool(!bool)
        navigate('/')
    }
    const handleDepClick = (e) => {
        setActivepage({
            emp: false,
            dep: true
        })
        setBool(!bool)
        navigate('/department')
    }
    const handleLogout = () => {
        // setChangeLog(!changeLog)
        localStorage.removeItem('user')
        window.location.reload()
        navigate("/")
    }
    useEffect(() => {
        localStorage.setItem('active', JSON.stringify(activepage));
    }, [bool]);


    return (
        <div className='sidebar'>
            <ProSidebar collapsed={menuCollapse}>
                <SidebarHeader>

                    <div className="closemenu" onClick={menuIconClick}>
                        {/* changing menu collapse icon on click */}
                        {menuCollapse ? (
                            <FiArrowRightCircle />
                        ) : (
                            <FiArrowLeftCircle />
                        )}
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem active={activepage.emp} onClick={(e) => handleEmpClick(e)}>
                            {/* <div className="one active" > */}
                            Employee
                            {/* </div> */}
                        </MenuItem>
                        <MenuItem active={activepage.dep} onClick={(e) => handleDepClick(e)}>
                            {/* <div className="two "> */}
                            Department
                            {/* </div> */}
                        </MenuItem>
                        <button onClick={handleLogout} className="logout">
                            <MenuItem>

                                Logout

                            </MenuItem>
                        </button>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
    )
}

export default Sidebar