package com.obss.enumeration;

public enum Error {
	OK(1), BOOK_NOT_FOUND(0), WRITER_NOT_FOUND(-1), USER_NOT_FOUND(-2), WRONG_ROLE_ID(-3), USED_EMAIL(-4),
	WRITER_ADDING_BEFORE(-5), BOOK_ADDING_BEFORE(-6);

	private int num;

	private Error(int num) {
		this.num = num;
	}

	public int getNumber() {
		return num;
	}
}
