package com.obss.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.obss.models.Writer;

public class WriterMapper implements RowMapper<Writer> {

	public Writer mapRow(ResultSet rs, int rowNum) throws SQLException {
		Writer writer = new Writer();
		writer.setWid(rs.getInt("wid"));
		writer.setName(rs.getString("name"));
		writer.setSurname(rs.getString("surname"));
		return writer;
	}
}
