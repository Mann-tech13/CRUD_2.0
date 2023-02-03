package com.mann.CRUD.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mann.CRUD.entities.Department;
import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.services.Services;
import com.mann.CRUD.vo.DepartmentVO;
import com.mann.CRUD.vo.EmployeeVO;

@RestController
public class DepartmentController {
	@Autowired
	private Services service;
	
	@GetMapping("/deptest")
	public String test() {
		return "Department testing..!";
	}
	
	@PostMapping(path = "/department", consumes = "application/json")
	public Department addEmployee(@RequestBody DepartmentVO valObj) {
		return this.service.DepartmentVOImpl(valObj);
	}
	
	@GetMapping(path = "/department")
	public List<DepartmentVO> getData(){
		return this.service.getDepartmentData();
	}
}
