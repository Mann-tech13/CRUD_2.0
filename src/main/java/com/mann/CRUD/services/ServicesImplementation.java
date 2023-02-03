package com.mann.CRUD.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mann.CRUD.dao.DepartmentDao;
import com.mann.CRUD.dao.EmployeeDao;
import com.mann.CRUD.entities.Department;
import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.vo.ValueObject;

@Service
public class ServicesImplementation implements Services {
	@Autowired
	private EmployeeDao empDao;
	@Autowired
	private DepartmentDao departmentDao;
//	private Service service;

//	@Override
//	public List<Employees> getData() {
//		return empDao.findAll();
//	}

	@Override
	public Employees addEmployee(Employees employee) {
		empDao.save(employee);
		return employee;
	}

//	@Override
//	public Employees getSingleData(int employeeId) {
//		Optional<Employees> employee = empDao.findById(employeeId);
//		Employees entity = null;
//		if (employee.isPresent()) {
//		     entity = employee.get();
//		     
//		} else {
//			System.out.println("Not found");
//		}
//		
//		return entity;
//	}
//
//	@Override
//	public Employees updateEmployee(Employees employee) {
//		empDao.save(employee);
//		return employee;
//	}

	@Override
	public Employees EmpVOImpl(ValueObject valObj) {
		// TODO Auto-generated method stub	
		int depId = valObj.getDepartment_id();
		Department depObj = getDepartment(depId);
		Employees employee = new Employees(valObj.getEmployee_id(), valObj.getEmployee_name(), valObj.getFlag(), depObj);
		return addEmployee(employee);
	}
	
	public Department getDepartment(int depId) {
		Optional<Department> dep = departmentDao.findById(depId);
		Department entity = null;
		if (dep.isPresent()) {
		     entity = dep.get();
		     
		} else {
			System.out.println("Not found");
		}
		return entity;
		
	}

	
//	@Autowired
//	private EmployeeDao empDao;
////	List<Employees> list;
//	public ServicesImplementation() {
////		list = new ArrayList<>();
////		list.add(new Employees(10, "Emp", "D01", "QA"));
////		list.add(new Employees(11, "Emp", "D01", "QA"));
//	}
//	
//	@Override
//	public List<Employees> getData() {
////		return list;
//		return empDao.findAll();
//	}
//
//	@Override
//	public Employees getSingleData(int employeeId) {
////		Employees emp = null;
////		for(Employees employee: list) {
////			if(employee.getEmployeeId() == employeeId) {
////				emp = employee;
////				break;
////			}
////		}
////		return emp;
//		Optional<Employees> employee = empDao.findById(employeeId);
//		Employees entity = null;
//		if (employee.isPresent()) {
//		    // Entity found in the database
//		     entity = employee.get();
//		     
//		} else {
//		    // Entity not found in the database
//			System.out.println("Not found");
//		}
//		
//		return entity;
//	}
//
//	@Override
//	public Employees addEmployee(Employees employee) {
////		list.add(employee);
////		return employee;
//		empDao.save(employee);
//		return employee;
//	}
//
//	@Override
//	public Employees deleteEmployee(int employeeId) {
////		Employees emp = null;
////		for(Employees employee: list) {
////			if(employee.getEmployeeId() == employeeId) {
////				emp = employee;
////				list.remove(employee);
////				break;
////			}
////		}
////		return emp;
//		Optional<Employees> employee = empDao.findById(employeeId);
//		Employees entity = null;
//		if (employee.isPresent()) {
//		    // Entity found in the database
//		     entity = employee.get();
//		     empDao.delete(entity);
//		} else {
//		    // Entity not found in the database
//			System.out.println("Not found");
//		}
//
//		return entity;
//	}
//
//	@Override
//	public Employees updateEmployee(Employees employee) {
//		
////		int index = 0;
////		for(Employees existedEmployee: list) {
////			if(existedEmployee.getEmployeeId() == employee.getEmployeeId()) {
////				list.set(index, employee);
////				break;
////			}
////			index++;
////		}
////		return employee;
//		empDao.save(employee);
//		return employee;
//	}

}
