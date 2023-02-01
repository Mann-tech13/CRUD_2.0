package com.mann.CRUD.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mann.CRUD.entities.Employees;

@Service
public class ServicesImplementation implements Services {

	List<Employees> list;
	public ServicesImplementation() {
		list = new ArrayList<>();
		list.add(new Employees(10, "Emp", "D01", "QA"));
		list.add(new Employees(11, "Emp", "D01", "QA"));
	}
	
	@Override
	public List<Employees> getData() {
		return list;
	}

	@Override
	public Employees getSingleData(int employeeId) {
		Employees emp = null;
		for(Employees employee: list) {
			if(employee.getEmployeeId() == employeeId) {
				emp = employee;
				break;
			}
		}
		return emp;
	}

	@Override
	public Employees addEmployee(Employees employee) {
		list.add(employee);
		return employee;
	}

	@Override
	public Employees deleteEmployee(int employeeId) {
		Employees emp = null;
		for(Employees employee: list) {
			if(employee.getEmployeeId() == employeeId) {
				emp = employee;
				list.remove(employee);
				break;
			}
		}
		return emp;
	}

	@Override
	public Employees updateEmployee(Employees employee) {
		
		int index = 0;
		for(Employees existedEmployee: list) {
			if(existedEmployee.getEmployeeId() == employee.getEmployeeId()) {
				list.set(index, employee);
				break;
			}
			index++;
		}
		return employee;
	}

}
