package com.mann.CRUD.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mann.CRUD.entities.Department;
import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.services.Services;
import com.mann.CRUD.vo.DepartmentVO;
import com.mann.CRUD.vo.EmployeeVO;

@RestController
@CrossOrigin
public class DepartmentController {
	@Autowired
	private Services service;
	
	@GetMapping("/deptest")
	public String test() {
		return "Department testing..!";
	}
	
	@GetMapping(path = "/department/{departmentId}")
	public DepartmentVO getSingleDepartment(@PathVariable String departmentId) {
		return this.service.getSingleDepartment(Integer.parseInt(departmentId));
	}
	
	@PostMapping(path = "/department", consumes = "application/json")
	public Department addEmployee(@RequestBody DepartmentVO valObj) {
		return this.service.DepartmentVOImpl(valObj);
	}
	
	@GetMapping(path = "/department")
	public List<DepartmentVO> getData(){
		return this.service.getDepartmentData();
	}
	
	@PutMapping(path = "/department", consumes = "application/json")
	public Department updateEmployee(@RequestBody DepartmentVO valObj) {
		return this.service.DepartmentVOImpl(valObj);
	}
	
	@DeleteMapping(path = "/department/{departmentId}")
	public DepartmentVO deleteDepartment(@PathVariable String departmentId) {
		return this.service.deleteDepartment(Integer.parseInt(departmentId));
	}
	
	@GetMapping(path = "/department/name/{depName}")
	public List<DepartmentVO> getByDepName(@PathVariable String depName) {
		return this.service.getByDepName(depName);
	}
	
	@GetMapping(path = "/department/status/{flag}")
	public List<DepartmentVO> getByDepFlag(@PathVariable String flag) {
		return this.service.getByDepFlag(flag);
	}
}
