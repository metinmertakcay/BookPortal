package com.obss.models;

import java.io.Serializable;

public class Role implements Serializable {

	private static final long serialVersionUID = 1L;

	private int rid;
	private String type;

	public Role() {

	}

	public Role(int rid, String type) {
		this.rid = rid;
		this.type = type;
	}

	public int getRid() {
		return rid;
	}

	public void setRid(int rid) {
		this.rid = rid;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
