package com.obss.enumeration;

public enum State {
	EMPTY(0), READ(1), FAVOURITE(2);

	private int num;

	private State(int num) {
		this.num = num;
	}

	public int getNumber() {
		return num;
	}
}
