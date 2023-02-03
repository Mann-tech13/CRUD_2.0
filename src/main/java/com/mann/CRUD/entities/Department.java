package com.mann.CRUD.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Department {
	@Id
	private int department_id;	
	private String department_name;
	
//	Can have many employees
	@JsonManagedReference
	@OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
	private List<Employees> list;
	
	public Department() {
		super();
	}
	public Department(int department_id, String department_name) {
		super();
		this.department_id = department_id;
		this.department_name = department_name;
	}
	public Department(int department_id, String department_name, List<Employees> list) {
		super();
		this.department_id = department_id;
		this.department_name = department_name;
		this.list = list;
	}
	public int getdepartment_id() {
		return department_id;
	}
	public void setdepartment_id(int department_id) {
		this.department_id = department_id;
	}
	public String getdepartment_name() {
		return department_name;
	}
	public void setdepartment_name(String department_name) {
		this.department_name = department_name;
	}
	public List<Employees> getList() {
		return list;
	}
	public void setList(List<Employees> list) {
		this.list = list;
	}
}
