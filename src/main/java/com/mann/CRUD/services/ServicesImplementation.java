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
import com.mann.CRUD.vo.DepartmentVO;
import com.mann.CRUD.vo.EmployeeVO;

@Service
public class ServicesImplementation implements Services {
	@Autowired
	private EmployeeDao empDao;
	@Autowired
	private DepartmentDao departmentDao;

//	Add Employee and department
	@Override
	public Employees addEmployee(Employees employee) {
		empDao.save(employee);
		return employee;
	}
	
	@Override
	public Employees EmpVOImpl(EmployeeVO valObj) {
		// TODO Auto-generated method stub	
		int depId = valObj.getDepartment_id();
		Department depObj = getDepartmentbyEmpId(depId);
		Employees employee = new Employees(valObj.getEmployee_id(), valObj.getEmployee_name(), valObj.getFlag(), depObj);
		return addEmployee(employee);
	}
	
	public Department getDepartmentbyEmpId(int depId) {
		Optional<Department> dep = departmentDao.findById(depId);
		Department entity = null;
		if (dep.isPresent()) {
		     entity = dep.get();
		     
		} else {
			System.out.println("Not found");
		}
		return entity;
		
	}

	@Override
	public Department DepartmentVOImpl(DepartmentVO valObj) {
		Department department = new Department(valObj.getDepartment_id(), valObj.getDepartment_name());
		return addDepartment(department);
	}

	public Department addDepartment(Department department) {
		departmentDao.save(department);
		return department;
	}
	
//	Get all data of employee as well as department
	@Override
	public List<EmployeeVO> getEmployeeData() {
		List<EmployeeVO> listVO = new ArrayList<>();
		List<Employees> list = new ArrayList<>();
		list = empDao.findAll();
		
		for(Employees emp: list) {
			int emp_id = emp.getEmployee_id();
			String emp_name = emp.getEmployee_name();
			String flag = emp.getFlag();
			Department dep = emp.getDepartment();
			
			listVO.add(new EmployeeVO(emp_id, emp_name, flag, dep.getdepartment_id()));
		}
		return listVO;
	}

	@Override
	public List<DepartmentVO> getDepartmentData() {
		List<DepartmentVO> listVO = new ArrayList<>();
		List<Department> list = new ArrayList<>();
		list = departmentDao.findAll();
		
		for(Department dep: list) {
			int dep_id = dep.getdepartment_id();
			String dep_name = dep.getdepartment_name();
			
			listVO.add(new DepartmentVO(dep_id, dep_name));
		}
		return listVO;
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
