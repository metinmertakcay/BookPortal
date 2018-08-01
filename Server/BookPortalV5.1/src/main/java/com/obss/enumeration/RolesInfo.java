package com.obss.enumeration;

public enum RolesInfo {
	USER(0), ADMIN(1), USER_ROLE_NOT_FOUND(-1);

	private int num;

	private RolesInfo(int num) {
		this.num = num;
	}

	public int getNumber() {
		return num;
	}
}
