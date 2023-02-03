package com.mann.CRUD.vo;

import com.mann.CRUD.entities.Department;
import com.mann.CRUD.entities.Employees;

public class ValueObject {
	
	
	private int employee_id;
	private String employee_name;
	private String flag;
	private int department_id;
	
	
	
	public ValueObject() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ValueObject(int employee_id, String employee_name, String flag, int department_id) {
		super();
		this.employee_id = employee_id;
		this.employee_name = employee_name;
		this.flag = flag;
		this.department_id = department_id;
	}
	public int getDepartment_id() {
		return department_id;
	}
	public void setDepartment_id(int department_id) {
		this.department_id = department_id;
	}
	public int getEmployee_id() {
		return employee_id;
	}
	public void setEmployee_id(int employee_id) {
		this.employee_id = employee_id;
	}
	public String getEmployee_name() {
		return employee_name;
	}
	public void setEmployee_name(String employee_name) {
		this.employee_name = employee_name;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String employee_flag) {
		this.flag = employee_flag;
	}
	
//	private Employees employee;
//
//	public Employees getEmployee() {
//		return employee;
//	}
//
//	public void setEmployee(Employees employee) {
//		this.employee = employee;
//	}
//
//	public ValueObject(Employees employee) {
//		super();
//		this.employee = employee;
//	}
//	
	
}
