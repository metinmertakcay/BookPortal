package com.obss.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.obss.models.UserBook;

public class UserBookMapper implements RowMapper<UserBook> {

	public UserBook mapRow(ResultSet rs, int rowNum) throws SQLException {
		UserBook userbook = new UserBook();
		userbook.setUid((rs.getInt("uid")));
		userbook.setBid((rs.getInt("bid")));
		userbook.setSid((rs.getInt("sid")));
		return userbook;
	}
}
