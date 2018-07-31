package com.obss.models;

import java.io.Serializable;

public class Book implements Serializable {
	private static final long serialVersionUID = 1L;

	private int bid;
	private int uid;
	private int wid;
	private String name;

	public Book() {

	}

	public Book(int bid, int uid, int wid, String name) {
		this.bid = bid;
		this.uid = uid;
		this.wid = wid;
		this.name = name;
	}

	public int getBid() {
		return bid;
	}

	public void setBid(int bid) {
		this.bid = bid;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
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
}
