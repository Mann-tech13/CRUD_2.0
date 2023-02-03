package com.mann.CRUD.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Employees {
	@Id
	private int employee_id;	
	private String employee_name;	
	private String flag;
	@JsonBackReference
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "department_id")
	private Department department;
//	@JsonIgnore

	
	public Employees() {
		super();
	}

	
	
	public Employees(int employee_id, String employee_name, String flag, Department department) {
		super();
		
		this.employee_id = employee_id;
		this.employee_name = employee_name;
		this.flag = flag;
		this.department = department;
	}



	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}


	public int getemployee_id() {
		return employee_id;
	}
	public void setemployee_id(int employee_id) {
		this.employee_id = employee_id;
	}
	public String getemployee_name() {
		return employee_name;
	}
	public void setemployee_name(String employee_name) {
		this.employee_name = employee_name;
	}
	public String getFlag() {
		return flag;
	}
	
	public void setFlag(String flag) {
		this.flag = flag;
	}
}
