package com.mann.CRUD.services;


import java.util.List;

import com.mann.CRUD.entities.Department;
import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.vo.DepartmentVO;
import com.mann.CRUD.vo.EmployeeVO;

public interface Services {

	List<EmployeeVO> getEmployeeData();
					
	Employees addEmployee(Employees employee);
	

//	Employees getSingleData(int employeeId);

//	Employees updateEmployee(Employees employee);

	Employees EmpVOImpl(EmployeeVO valObj);

	Department DepartmentVOImpl(DepartmentVO valObj);

	List<DepartmentVO> getDepartmentData();

}
