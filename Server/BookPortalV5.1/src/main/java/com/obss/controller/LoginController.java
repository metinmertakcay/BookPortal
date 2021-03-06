package com.obss.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.obss.enumeration.RolesInfo;
import com.obss.mapper.RoleMapper;
import com.obss.mapper.UserMapper;
import com.obss.models.Role;
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

	@GetMapping("/{email}/{password}")
	public int getUserRole(@PathVariable String email, @PathVariable String password) {
		Users u = jdbcTemplate.query("SELECT * FROM users WHERE email = ?",
				new Object[] { email }, new UserMapper()).get(0);
		if (u != null) {
			int randomNumber = Integer.valueOf(u.getPassword().substring(u.getPassword().length() - 1));
			if(!password.equals(u.getPassword().substring(randomNumber, u.getPassword().length() - 1))) {
				return -5;
			} else {
				Role role = jdbcTemplate
						.query("SELECT r.* FROM users u, role r WHERE email = ? AND password = ? AND u.rid = r.rid",
								new Object[] { email, u.getPassword() }, new RoleMapper())
						.get(0);
				if (role.getType().equalsIgnoreCase("admin")) {
					return RolesInfo.ADMIN.getNumber();
				} else {
					return RolesInfo.USER.getNumber();
				}
			}
		} else {
			return RolesInfo.USER_ROLE_NOT_FOUND.getNumber();
		}
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
