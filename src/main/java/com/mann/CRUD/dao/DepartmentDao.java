package com.mann.CRUD.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mann.CRUD.entities.Department;

public interface DepartmentDao extends JpaRepository<Department, Integer> {
	public List<Department> findByDepartmentName(String name);
	public List<Department> findByFlag(String flag);
}
