package com.mann.CRUD.services;

import java.util.List;

import com.mann.CRUD.entities.Employees;

public interface Services {
	public Employees addEmployee(Employees employee);
	public List<Employees> getData();
	public Employees getSingleData(int employeeId);
	public Employees deleteEmployee(int employeeId);
	public Employees updateEmployee(Employees employee);
}
