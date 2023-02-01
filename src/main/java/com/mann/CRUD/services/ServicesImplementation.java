package com.mann.CRUD.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mann.CRUD.entities.Employees;

@Service
public class ServicesImplementation implements Services {

	List<Employees> list;
	public ServicesImplementation() {
		list = new ArrayList<>();
		list.add(new Employees("E10", "Emp", "D01", "QA"));
	}
	
	@Override
	public List<Employees> getData() {
		// TODO Auto-generated method stub
		return list;
	}

}
