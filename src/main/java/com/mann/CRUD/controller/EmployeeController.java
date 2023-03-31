package com.mann.CRUD.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.services.Services;
import com.mann.CRUD.vo.EmployeeVO;

/**
 * @author mannj
 *
 */
@RestController
@CrossOrigin
public class EmployeeController {
	@Autowired
	private Services service;
	
	@GetMapping("/emptest")
	public String test() {
		return "testing..!";
	}
	
	@GetMapping(path = "/employees/{pageNumber}/{pageSize}")
	public List<EmployeeVO> getData(@PathVariable int pageNumber, @PathVariable int pageSize){

		return this.service.getEmployeePaginatedData(pageNumber, pageSize);
//		return null;
	}
	
	@GetMapping(path = "/employees")
	public List<EmployeeVO> getData(){
		
		return this.service.getEmployeeData();
//		return null;
	}
	
	@GetMapping(path = "/employees/{employeeId}")
	public EmployeeVO getSingleEmployee(@PathVariable String employeeId) {
		return this.service.getSingleEmployee(Integer.parseInt(employeeId));
	}
	
	@GetMapping(path = "/employees/name/{empName}")
	public List<EmployeeVO> getByEmpName(@PathVariable String empName) {
		return this.service.getByEmpName(empName);
	}
	
	@GetMapping(path = "/employees/status/{flag}")
	public List<EmployeeVO> getByEmpFlag(@PathVariable String flag) {
		return this.service.getByEmpFlag(flag);
	}
	
	@PostMapping(path = "/employees", consumes = "application/json")
	public Employees addEmployee(@RequestBody EmployeeVO valObj) {
		return this.service.EmpVOImpl(valObj);
	}
	
	@PutMapping(path = "/employees", consumes = "application/json")
	public Employees updateEmployee(@RequestBody EmployeeVO valObj) {
		return this.service.EmpVOImpl(valObj);
	}
	
	@DeleteMapping(path = "/employees/{employeeId}")
	public EmployeeVO deleteEmployee(@PathVariable String employeeId) {
		return this.service.deleteEmployee(Integer.parseInt(employeeId));
	}
}
