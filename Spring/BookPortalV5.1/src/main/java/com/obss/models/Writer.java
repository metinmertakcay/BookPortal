package com.obss.models;

import java.io.Serializable;

public class Writer implements Serializable {

	private static final long serialVersionUID = 1L;

	private int wid;
	private String name;
	private String surname;

	public Writer() {

	}

	public Writer(int wid, String name, String surname) {
		this.wid = wid;
		this.name = name;
		this.surname = surname;
	}

	public int getWid() {
		return wid;
	}

	public void setWid(int wid) {
		this.wid = wid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}
}
