package com.obss.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.obss.mapper.UserMapper;
import com.obss.models.Users;
import com.obss.security.JwtGenerator;

@RestController
@RequestMapping("/login")
public class LoginController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private JwtGenerator jwtGenerator;

	public LoginController(JwtGenerator jwtGenerator) {
		this.jwtGenerator = jwtGenerator;
	}

	@PostMapping
	public String generate(@RequestBody final Users user) {
		ArrayList<Users> users = (ArrayList<Users>) jdbcTemplate.query(
				"SELECT * FROM users WHERE email = ? AND password = ?",
				new Object[] { user.getEmail(), user.getPassword() }, new UserMapper());
		if (users.size() > 0) {
			return jwtGenerator.generate(users.get(0));
		}
		return null;
	}
}
