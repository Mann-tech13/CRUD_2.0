package com.mann.CRUD.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Employees {
	@Id
	private int employeeId;	
	private String employeeName;	
	private String departmentId;	
	private String departmentName;
	
	public Employees(int employeeId, String employeeName, String departmentId, String departmentName) {
		super();
		this.employeeId = employeeId;
		this.employeeName = employeeName;
		this.departmentId = departmentId;
		this.departmentName = departmentName;
	}
	
	public Employees() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	@Override
	public String toString() {
		return "Employees [employeeId=" + employeeId + ", employeeName=" + employeeName + ", departmentId="
				+ departmentId + ", departmentName=" + departmentName + "]";
	}
	
	
}
