package com.mann.CRUD.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.services.Services;

@RestController
public class LoginController {
	@Autowired
	private Services service;
	
	@GetMapping("/home")
	public String home() {
		return "home page executed";
	}
	
//	Get all the data
	@GetMapping("/employees")
	public List<Employees> getData(){
		return this.service.getData();
	}
}
