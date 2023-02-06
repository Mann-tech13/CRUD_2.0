package com.mann.CRUD.services;


import java.util.List;

import org.springframework.http.ResponseEntity;

import com.mann.CRUD.entities.Department;
import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.vo.DepartmentVO;
import com.mann.CRUD.vo.EmployeeVO;

public interface Services {

	List<EmployeeVO> getEmployeeData();

	Employees EmpVOImpl(EmployeeVO valObj);

	EmployeeVO deleteEmployee(int employeeId);
	
	DepartmentVO deleteDepartment(int departmentId);

	Department DepartmentVOImpl(DepartmentVO valObj);

	ResponseEntity<List<DepartmentVO>> getDepartmentData();

	EmployeeVO getSingleEmployee(int employeeId);

	DepartmentVO getSingleDepartment(int departmentId);


}
