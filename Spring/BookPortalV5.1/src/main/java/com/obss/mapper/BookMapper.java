package com.obss.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.obss.models.Book;

public class BookMapper implements RowMapper<Book> {

	public Book mapRow(ResultSet rs, int rowNum) throws SQLException {
		Book book = new Book();
		book.setBid(rs.getInt("bid"));
		book.setUid((rs.getInt("uid")));
		book.setWid((rs.getInt("wid")));
		book.setName((rs.getString("name")));
		return book;
	}
}
