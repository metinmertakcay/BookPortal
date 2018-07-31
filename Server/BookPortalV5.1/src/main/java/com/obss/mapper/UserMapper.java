package com.obss.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.obss.models.Users;

public class UserMapper implements RowMapper<Users> {

	public Users mapRow(ResultSet rs, int rowNum) throws SQLException {
		Users user = new Users();
		user.setUid((rs.getInt("uid")));
		user.setEmail((rs.getString("email")));
		user.setName((rs.getString("name")));
		user.setPassword((rs.getString("password")));
		user.setRid((rs.getInt("rid")));
		return user;
	}
}
