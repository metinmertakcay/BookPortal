package com.obss.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.obss.models.Role;

public class RoleMapper implements RowMapper<Role> {

	public Role mapRow(ResultSet rs, int rowNum) throws SQLException {
		Role role = new Role();
		role.setRid(rs.getInt("rid"));
		role.setType(rs.getString("type"));
		return role;
	}
}
