package com.mann.CRUD.services;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mann.CRUD.entities.Authentication;
import com.mann.CRUD.entities.Department;
import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.vo.AuthenticationVO;
import com.mann.CRUD.vo.DepartmentVO;
import com.mann.CRUD.vo.EmployeeVO;

@Service
public interface Services {

	List<EmployeeVO> getEmployeePaginatedData(int pageNumber, int pageSize);

	Employees EmpVOImpl(EmployeeVO valObj);

	EmployeeVO deleteEmployee(int employeeId);
	
	DepartmentVO deleteDepartment(int departmentId);

	Department DepartmentVOImpl(DepartmentVO valObj);

	List<DepartmentVO> getDepartmentData();

	EmployeeVO getSingleEmployee(int employeeId);

	DepartmentVO getSingleDepartment(int departmentId);

	Authentication addUserVO(AuthenticationVO valObj);

	AuthenticationVO getUser(String name);

	List<EmployeeVO> getEmployeeData();

	List<EmployeeVO> getByEmpName(String empName);

	List<EmployeeVO> getByEmpFlag(String flag);

	List<DepartmentVO> getByDepName(String depName);

	List<DepartmentVO> getByDepFlag(String flag);


}
