package com.obss.models;

import java.util.Base64;
import java.util.Random;

public class EncodePassword {

	private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	public static String encode(String password) {
		int randomNumber = generateRandomNumber();
		String randomString = randomAlphaNumeric(randomNumber);
		return Base64.getEncoder().encodeToString((randomString + password).getBytes()) + randomNumber;
	}

	public static String decode(String password) {
		return new String(Base64.getDecoder().decode(password));
	}

	public static int generateRandomNumber() {
		Random rand = new Random();
		return rand.nextInt(9) + 1;
	}

	public static String randomAlphaNumeric(int count) {
		StringBuilder builder = new StringBuilder();
		while (count-- != 0) {
			int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());
			builder.append(ALPHA_NUMERIC_STRING.charAt(character));
		}
		return builder.toString();
	}
}
