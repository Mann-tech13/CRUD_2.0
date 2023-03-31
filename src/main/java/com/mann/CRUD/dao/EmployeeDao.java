package com.mann.CRUD.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.mann.CRUD.entities.Employees;

public interface EmployeeDao extends JpaRepository<Employees, Integer> {
	public List<Employees> findByEmployeeName(String name);
	public List<Employees> findByFlag(String name);	
}
