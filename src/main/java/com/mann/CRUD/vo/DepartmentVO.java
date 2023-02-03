package com.mann.CRUD.vo;

public class DepartmentVO {
	private int department_id;	
	private String department_name;
	public DepartmentVO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public DepartmentVO(int department_id, String department_name) {
		super();
		this.department_id = department_id;
		this.department_name = department_name;
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
}
