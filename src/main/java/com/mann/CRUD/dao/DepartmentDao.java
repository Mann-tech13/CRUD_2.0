package com.mann.CRUD.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mann.CRUD.entities.Department;

public interface DepartmentDao extends JpaRepository<Department, Integer> {

}
