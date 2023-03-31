package com.mann.CRUD.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mann.CRUD.entities.Authentication;

public interface AuthenticationDao extends JpaRepository<Authentication, String> {
	
}
