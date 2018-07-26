package com.obss.models;

import java.io.Serializable;

public class State implements Serializable {

	private static final long serialVersionUID = 1L;

	private int sid;
	private String sname;

	public State() {

	}

	public State(int sid, String sname) {
		this.sid = sid;
		this.sname = sname;
	}

	public int getSid() {
		return sid;
	}

	public void setSid(int sid) {
		this.sid = sid;
	}

	public String getSname() {
		return sname;
	}

	public void setSname(String sname) {
		this.sname = sname;
	}
}
