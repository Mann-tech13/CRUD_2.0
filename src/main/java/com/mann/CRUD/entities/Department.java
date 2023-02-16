package com.mann.CRUD.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Department {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@SequenceGenerator(initialValue = 50, name = "emp")
	@Column(unique=true)
	private int department_id;	
	private String department_name;
	private String flag;
	
//	Can have many employees
	@JsonManagedReference
	@OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
	private List<Employees> list;
	
	public Department() {
		super();
	}
	
	public Department(int department_id, String department_name, String flag) {
		super();
		this.department_id = department_id;
		this.department_name = department_name;
		this.flag = flag;
	}

	public int getDepartment_id() {
		return department_id;
	}
	public void setDepartment_id(int department_id) {
		this.department_id = department_id;
	}
	public String getDepartment_name() {
		return department_name;
	}
	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public List<Employees> getList() {
		return list;
	}
	public void setList(List<Employees> list) {
		this.list = list;
	}
}
