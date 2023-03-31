package com.mann.CRUD.services;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mann.CRUD.dao.AuthenticationDao;
import com.mann.CRUD.dao.DepartmentDao;
import com.mann.CRUD.dao.EmployeeDao;
import com.mann.CRUD.entities.Authentication;
import com.mann.CRUD.entities.Department;
import com.mann.CRUD.entities.Employees;
import com.mann.CRUD.vo.AuthenticationVO;
import com.mann.CRUD.vo.DepartmentVO;
import com.mann.CRUD.vo.EmployeeVO;

@Service
public class ServicesImplementation implements Services {
	@Autowired
	private EmployeeDao empDao;
	@Autowired
	private DepartmentDao departmentDao;
	@Autowired
	private AuthenticationDao authDao;

//	Add Employee and department | PUSH & PUT
	public Employees addEmployee(Employees employee) {
		empDao.save(employee);
		return employee;
	}

	@Override
	public Employees EmpVOImpl(EmployeeVO valObj) {
		// TODO Auto-generated method stub
		int depId = valObj.getDepartment_id();
		Department depObj = getDepartmentbyEmpId(depId);
		Employees employee = new Employees(valObj.getEmployee_id(), valObj.getEmployee_name(), depObj, valObj.getFlag());
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
		Department department = new Department(valObj.getDepartment_id(), valObj.getDepartment_name(),
				valObj.getFlag());
		return addDepartment(department);
	}

	public Department addDepartment(Department department) {
		departmentDao.save(department);
		return department;
	}

//	Get all data of employee as well as department | GET
	@Override
	public List<EmployeeVO> getEmployeePaginatedData(int pageNumber, int pageSize) {
		List<EmployeeVO> listVO = new ArrayList<>();
		List<Employees> list = new ArrayList<>();
//		int pageSize = 10;
//		int pageNumber = 1;
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		Page<Employees> pages = empDao.findAll(pageable);
//		List<Employees> content = pages.getContent();
		list = pages.toList();
//		System.out.println(list.size());	
		for (Employees emp : list) {
			System.out.println("inlist");
			System.out.println(emp);
			int emp_id = emp.getEmployeeId();
			String emp_name = emp.getEmployeeName();
			String flag = emp.getFlag();
			Department dep = emp.getDepartment();

			listVO.add(new EmployeeVO(emp_id, emp_name, flag, dep.getDepartment_id()));
		}
		return listVO;
	}
	
	@Override
	public List<DepartmentVO> getByDepName(String depName) {
		List<DepartmentVO> listVO = new ArrayList<>();
		List<Department> list = new ArrayList<>();
		list = departmentDao.findByDepartmentName(depName);
		for(int i=0; i<list.size(); i++) {
			Department dep = list.get(i);
			DepartmentVO depVO = new DepartmentVO(dep.getDepartment_id(), dep.getDepartmentName(), dep.getFlag());
			listVO.add(depVO);
		}
		return listVO;
	}

	@Override
	public List<DepartmentVO> getByDepFlag(String flag) {
		List<DepartmentVO> listVO = new ArrayList<>();
		List<Department> list = new ArrayList<>();
		list = departmentDao.findByFlag(flag);
		for(int i=0; i<list.size(); i++) {
			Department dep = list.get(i);
			DepartmentVO depVO = new DepartmentVO(dep.getDepartment_id(), dep.getDepartmentName(), dep.getFlag());
			listVO.add(depVO);
		}
		return listVO;
	}
	
	@Override
	public List<EmployeeVO> getEmployeeData() {
		List<EmployeeVO> listVO = new ArrayList<>();
		List<Employees> list = new ArrayList<>();
		list = empDao.findAll();

		for (Employees emp : list) {
			int emp_id = emp.getEmployeeId();
			String emp_name = emp.getEmployeeName();
			String flag = emp.getFlag();
			Department dep = emp.getDepartment();

			listVO.add(new EmployeeVO(emp_id, emp_name, flag, dep.getDepartment_id()));
		}
		return listVO;
	}
	

	@Override
	public List<DepartmentVO> getDepartmentData() {
		List<DepartmentVO> listVO = new ArrayList<>();
		List<Department> list = new ArrayList<>();
		list = departmentDao.findAll();

		for (Department dep : list) {
			int dep_id = dep.getDepartment_id();
			String dep_name = dep.getDepartmentName();
			String dep_flag = dep.getFlag();

			listVO.add(new DepartmentVO(dep_id, dep_name, dep_flag));
		}
		return listVO;
	}
	
	@Override
	public List<EmployeeVO> getByEmpName(String empName) {
		List<EmployeeVO> listVO = new ArrayList<>();
		List<Employees> list = new ArrayList<>();
		list = empDao.findByEmployeeName(empName);
		for(int i=0; i<list.size(); i++) {
			Employees emp = list.get(i);
			EmployeeVO empVO = new EmployeeVO(emp.getEmployeeId(), emp.getEmployeeName(), emp.getFlag(), emp.getDepartment().getDepartment_id());
			listVO.add(empVO);
		}
		return listVO;
	}
	
	@Override
	public List<EmployeeVO> getByEmpFlag(String flag) {
		List<EmployeeVO> listVO = new ArrayList<>();
		List<Employees> list = new ArrayList<>();
		list = empDao.findByFlag(flag);
		for(int i=0; i<list.size(); i++) {
			Employees emp = list.get(i);
			EmployeeVO empVO = new EmployeeVO(emp.getEmployeeId(), emp.getEmployeeName(), emp.getFlag(), emp.getDepartment().getDepartment_id());
			listVO.add(empVO);
		}
		return listVO;
	}

//	Delete Employee and Department Data | Soft & Hard Delete | DELETE
	@Override
	public EmployeeVO deleteEmployee(int employeeId) {
		EmployeeVO empVO = null;
		Optional<Employees> emp = empDao.findById(employeeId);
		Employees entity = null;
		if (emp.isPresent()) {
			entity = emp.get();
			empVO = new EmployeeVO(entity.getEmployeeId(), entity.getEmployeeName(), entity.getFlag(),
					entity.getDepartment().getDepartment_id());
			if (empVO.getFlag().equals("Active")) {
				empVO.setFlag("Inactive");
				Department dep = new Department(entity.getDepartment().getDepartment_id(),
						entity.getDepartment().getDepartmentName(), entity.getDepartment().getFlag());
				empDao.save(new Employees(empVO.getEmployee_id(), empVO.getEmployee_name(), dep, empVO.getFlag()));
			}
		} else {
			System.out.println("Not found");
		}

		return empVO;
	}

	@Override
	public DepartmentVO deleteDepartment(int departmentId) {
		DepartmentVO depVO = null;
		Optional<Department> dep = departmentDao.findById(departmentId);
		Department entity = null;
		if (dep.isPresent()) {
			entity = dep.get();
			depVO = new DepartmentVO(entity.getDepartment_id(), entity.getDepartmentName(), entity.getFlag());
			if (depVO.getFlag().equals("Active")) {
				depVO.setFlag("Inactive");
				List<EmployeeVO> listVO = getEmployeeData();
				for (EmployeeVO empVO : listVO) {
					if (empVO.getDepartment_id() == departmentId) {
						empVO.setFlag("Inactive");
						empDao.save(new Employees(empVO.getEmployee_id(), empVO.getEmployee_name(), entity, empVO.getFlag()));
					}

				}
				departmentDao
						.save(new Department(depVO.getDepartment_id(), depVO.getDepartment_name(), depVO.getFlag()));

			}
		} else {
			System.out.println("Not found");
		}
		return depVO;
	}

//	Get Single Data | GET
	@Override
	public EmployeeVO getSingleEmployee(int employeeId) {
		Optional<Employees> employee = empDao.findById(employeeId);
		EmployeeVO empVO = null;
		Employees emp = null;
		if(employee.isPresent()) {
			emp = employee.get();
			empVO = new EmployeeVO(emp.getEmployeeId(), emp.getEmployeeName(), emp.getFlag(), emp.getDepartment().getDepartment_id());
		}
		return empVO;
	}

	@Override
	public DepartmentVO getSingleDepartment(int departmentId) {
		Optional<Department> department = departmentDao.findById(departmentId);
		DepartmentVO depVO = null;
		Department dep = null;
		if(department.isPresent()) {
			dep = department.get();
			depVO = new DepartmentVO(dep.getDepartment_id(), dep.getDepartmentName(), dep.getFlag());
		}
		return depVO;
	}

//	Authentication
	@Override
	public Authentication addUserVO(AuthenticationVO valObj) {
		Authentication user = new Authentication(valObj.getName(), valObj.getPassword());
//		System.out.println(user.getName()+ " " + valObj.getPassword());
		authDao.save(user);
		return user;
	}

	@Override
	public AuthenticationVO getUser(String name) {
		Optional<Authentication> authentication = authDao.findById(name);
		AuthenticationVO authVO = null;
		Authentication auth = null;
		if(authentication.isPresent()) {
			auth = authentication.get();
			authVO = new AuthenticationVO(auth.getName(), auth.getPassword());
		}
		return authVO;
	}


	

	
}





