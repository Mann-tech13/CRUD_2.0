package com.mann.CRUD.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Authentication {
	@Id
	private String name;
	private String password;
	public Authentication() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Authentication(String name, String password) {
		super();
		this.name = name;
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
