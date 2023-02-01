package com.mann.CRUD.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mann.CRUD.entities.Employees;

public interface EmployeeDao extends JpaRepository<Employees, Integer> {
	
}
