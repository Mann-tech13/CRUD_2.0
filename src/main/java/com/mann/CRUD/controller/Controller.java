package com.mann.CRUD.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.services.Services;

/**
 * @author mannj
 *
 */
@RestController
public class Controller {
	@Autowired
	private Services service;
	
	@GetMapping("/home")
	public String home() {
		return "home page executed";
	}
	
//	Get all the data
	@GetMapping(path = "/employees")
	public List<Employees> getData(){
		return this.service.getData();
	}
	
//	Get single element
	@GetMapping(path = "/employees/{employeeId}")
	public Employees getSingleData(@PathVariable String employeeId){
		return this.service.getSingleData(Integer.parseInt(employeeId));
	}
	
//	Send data
	@PostMapping(path = "/employees", consumes = "application/json")
	public Employees addEmployee(@RequestBody Employees employee) {
		return this.service.addEmployee(employee);
	}
	
//	delete data
	@DeleteMapping(path = "/employees/{employeeId}")
	public Employees deleteEmployee(@PathVariable String employeeId) {
		return this.service.deleteEmployee(Integer.parseInt(employeeId));
	}
	
//	put data
	@PutMapping(path = "/employees", consumes = "application/json")
	public Employees updateEmployee(@RequestBody Employees employee) {
		return this.service.updateEmployee(employee);
	}
}
