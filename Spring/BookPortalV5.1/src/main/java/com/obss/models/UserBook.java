package com.obss.models;

import java.io.Serializable;

public class UserBook implements Serializable {

	private static final long serialVersionUID = 1L;

	private int uid;
	private int bid;
	private int sid;

	public UserBook() {

	}

	public UserBook(int uid, int bid, int sid) {
		this.uid = uid;
		this.bid = bid;
		this.sid = sid;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public int getBid() {
		return bid;
	}

	public void setBid(int bid) {
		this.bid = bid;
	}

	public int getSid() {
		return sid;
	}

	public void setSid(int sid) {
		this.sid = sid;
	}
}
