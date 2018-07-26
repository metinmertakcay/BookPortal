package com.obss.models;

import java.io.Serializable;

public class Users implements Serializable {

	private static final long serialVersionUID = 1L;

	private int uid;
	private String email;
	private String name;
	private String password;
	private int rid;

	public Users() {

	}

	public Users(int uid, String email, String name, String password, int rid) {
		this.uid = uid;
		this.email = email;
		this.name = name;
		this.password = password;
		this.rid = rid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public int getRid() {
		return rid;
	}

	public void setRid(int rid) {
		this.rid = rid;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}
}
