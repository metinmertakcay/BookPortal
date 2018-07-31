package com.obss.security;

import org.springframework.stereotype.Component;

import com.obss.models.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtGenerator {

	public String generate(Users user) {
		Claims claims = Jwts.claims().setSubject(user.getEmail());
		claims.put("uid", user.getUid());
		claims.put("name", user.getName());
		claims.put("rid", user.getRid());
		return Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS512, "secret").compact();
	}
}
