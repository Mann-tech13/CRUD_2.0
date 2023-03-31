package com.mann.CRUD.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mann.CRUD.entities.Authentication;
import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.services.Services;
import com.mann.CRUD.vo.AuthenticationVO;
import com.mann.CRUD.vo.EmployeeVO;

@RestController
@CrossOrigin
public class UserController {
	
	@Autowired
	private Services service;
	
	@GetMapping("/usertest")
	public String test() {
		return "User Tested";
	}
	
	@PostMapping(path = "/user", consumes = "application/json")
	public Authentication addAuthentication(@RequestBody AuthenticationVO valObj) {
		System.out.println(valObj.getPassword());
		return this.service.addUserVO(valObj);
	}
	
	@GetMapping(path = "/user/{name}")
	public AuthenticationVO getUser(@PathVariable String name) {
		return this.service.getUser(name);
	}
}
