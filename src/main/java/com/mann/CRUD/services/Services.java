package com.mann.CRUD.services;


import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.vo.ValueObject;

public interface Services {

//	List<Employees> getData();

	Employees addEmployee(Employees employee);

//	Employees getSingleData(int employeeId);

//	Employees updateEmployee(Employees employee);

	Employees EmpVOImpl(ValueObject valObj);

}
