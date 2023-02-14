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
        // console.log(e)

        setActivepage({
            emp: false,
            dep: true
        })
        setBool(!bool)
        navigate('/department')
    }
    
    // useEffect(() => {
    //     const localActive = localStorage.getItem('active');
    //     console.log(localActive)
    //     if (localActive) {
    //         setActivepage(JSON.parse(localActive));
    //     }
    // }, []);
    useEffect(() => {
        localStorage.setItem('active', JSON.stringify(activepage));
        // console.log("2");
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
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
    )
}

export default Sidebar