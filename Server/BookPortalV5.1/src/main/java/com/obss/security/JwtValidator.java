package com.obss.security;

import org.springframework.stereotype.Component;

import com.obss.models.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtValidator {

	private String secret = "secret";

	public Users validate(String token) {
		Users user = null;

		try {
			Claims body = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
			user = new Users();

			user.setEmail(body.getSubject());
			user.setUid((Integer) body.get("uid"));
			user.setName((String) body.get("name"));
			user.setRid((Integer) body.get("rid"));
		} catch (Exception e) {
			System.out.println(e);
		}
		return user;
	}
}
