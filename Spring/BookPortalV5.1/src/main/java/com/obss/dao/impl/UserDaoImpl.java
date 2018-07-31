package com.obss.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.obss.dao.UserDao;
import com.obss.enumeration.State;
import com.obss.mapper.BookMapper;
import com.obss.mapper.RoleMapper;
import com.obss.mapper.UserBookMapper;
import com.obss.mapper.UserMapper;
import com.obss.mapper.WriterMapper;
import com.obss.models.Book;
import com.obss.models.UserBook;
import com.obss.models.Users;
import com.obss.models.Writer;

@Repository("userDaoImpl")
public class UserDaoImpl implements UserDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public ArrayList<Book> findAllBook() {
		ArrayList<Book> books = new ArrayList<Book>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList("SELECT * FROM book");

		for (Map<String, Object> row : rows) {
			Book book = new Book();
			book.setBid((Integer) (row.get("bid")));
			book.setUid((Integer) (row.get("uid")));
			book.setWid((Integer) (row.get("wid")));
			book.setName((String) (row.get("name")));
			books.add(book);
		}
		System.out.println("Find All Book DB");
		return books;
	}

	public int getBookInsideList(int uid, int bid) {
		ArrayList<UserBook> userbook =  (ArrayList<UserBook>)getJdbcTemplate().query("SELECT * FROM userbook WHERE uid = ? AND bid = ?",
				new Object[] { uid, bid }, new UserBookMapper());
		if(userbook.size() != 0) {
			return userbook.get(0).getSid();
		} else {
			return State.EMPTY.getNumber();
		}
	}

	public void addBookInsideReadList(int uid, int bid) {
		checkBookInsideList(uid, bid, State.READ.getNumber());
		System.out.println("Add Read Book User List DB");
	}

	public void addBookInsideFavouriteList(int uid, int bid) {
		checkBookInsideList(uid, bid, State.FAVOURITE.getNumber());
		System.out.println("Add Favourite Book User List DB");
	}

	public void checkBookInsideList(int uid, int bid, int sid) {
		if (getJdbcTemplate().query("SELECT * FROM userbook WHERE uid = ? AND bid = ?", new Object[] { uid, bid },
				new UserBookMapper()).size() > 0) {
			getJdbcTemplate().update("UPDATE userbook SET sid = ? WHERE uid = ? AND bid = ?",
					new Object[] { sid, uid, bid });
		} else {
			getJdbcTemplate().update("INSERT INTO userbook (uid, bid, sid) VALUES (?, ?, ?)", uid, bid, sid);
		}
	}

	public ArrayList<Book> searchBook(String name) {
		ArrayList<Book> books = (ArrayList<Book>) getJdbcTemplate().query("SELECT * FROM book WHERE name = ?",
				new Object[] { name }, new BookMapper());
		System.out.println("Search Book DB");
		return books;
	}

	public ArrayList<Users> searchUser(String name) {
		ArrayList<Users> users = (ArrayList<Users>) getJdbcTemplate().query("SELECT * FROM users WHERE name = ?",
				new Object[] { name }, new UserMapper());
		System.out.println("Search User DB");
		return users;
	}

	public int saveBook(Book book) {
		int result = checkBookInputForm(book);
		if (result == 1) {
			result = getJdbcTemplate().update("INSERT INTO book (uid, wid, name) VALUES (?, ?, ?)",
					new Object[] { book.getUid(), book.getWid(), book.getName() });
			System.out.println("Insert Book DB");
		}
		return result;

	}

	public int checkBookInputForm(Book book) {
		if (searchBookAddingPreviously(book.getWid(), book.getName()) == 0) {
			if (searchWriter(book.getWid()) != 0) {
				if (searchUser(book.getUid()) != 0) {
					return 1;
				} else {
					return -1;
				}
			} else {
				return 0;
			}
		} else {
			return -2;
		}
	}

	public int searchBookAddingPreviously(int wid, String name) {
		return getJdbcTemplate()
				.query("SELECT * FROM book WHERE wid = ? AND name = ?", new Object[] { wid, name }, new BookMapper())
				.size();
	}

	public int searchUser(int uid) {
		return getJdbcTemplate().query("SELECT * FROM users WHERE uid = ?", new Object[] { uid }, new UserMapper())
				.size();
	}

	public int searchWriter(int wid) {
		return getJdbcTemplate().query("SELECT * FROM writer WHERE wid = ?", new Object[] { wid }, new WriterMapper())
				.size();
	}

	public int updateBook(int bid, Book book) {
		if (getJdbcTemplate().query("SELECT * FROM book WHERE bid = ?", new Object[] { bid }, new BookMapper())
				.size() != 0) {
			int result = checkBookInputForm(book);
			if (result == 1) {
				result = getJdbcTemplate().update("UPDATE book SET bid = ?, uid = ?, wid = ?, name = ? WHERE bid = ?",
						new Object[] { bid, book.getUid(), book.getWid(), book.getName(), bid });
				System.out.println("Update Book DB");
			}
			return result;
		}
		return -3;
	}

	public int deleteBook(int bid) {
		int deletedItemNumber = getJdbcTemplate().update("DELETE FROM book WHERE bid = ?", new Object[] { bid });
		if (deletedItemNumber != 0) {
			getJdbcTemplate().update("DELETE FROM userbook WHERE bid = ?", new Object[] { bid });
			System.out.println("Delete Book DB");
			return deletedItemNumber;
		}
		return 0;
	}

	public int saveWriter(Writer writer) {
		if (getJdbcTemplate().query("SELECT * FROM writer WHERE name = ? AND surname = ?",
				new Object[] { writer.getName(), writer.getSurname() }, new WriterMapper()).size() == 0) {
			getJdbcTemplate().update("INSERT INTO writer (name, surname) VALUES(?, ?)",
					new Object[] { writer.getName(), writer.getSurname() });
			System.out.println("Insert Writer DB");
			return 1;
		}
		return 0;
	}

	public int updateWriter(int wid, Writer writer) {
		if (getJdbcTemplate().query("SELECT * FROM writer WHERE wid = ?", new Object[] { wid }, new WriterMapper())
				.size() != 0) {
			getJdbcTemplate().update("UPDATE writer SET wid = ?, name = ?, surname = ? WHERE wid = ?",
					new Object[] { wid, writer.getName(), writer.getSurname(), wid });
			System.out.println("Update Writer DB");
			return 1;
		}
		return 0;
	}

	public int deleteWriter(int wid) {
		int deletedItemNumber = getJdbcTemplate().update("UPDATE book SET wid = ? WHERE wid = ?",
				new Object[] { null, wid });
		if (deletedItemNumber != 0) {
			getJdbcTemplate().update("DELETE FROM writer WHERE wid = ?", wid);
			System.out.println("Delete Writer DB");
			return deletedItemNumber;
		}
		return 0;
	}

	public int saveUser(Users user) {
		int result = checkUserInputForm(user);
		if (result == 1) {
			getJdbcTemplate().update("INSERT INTO users (email, name, password, rid) VALUES(?, ?, ?, ?)",
					new Object[] { user.getEmail(), user.getName(), user.getPassword(), user.getRid() });
			System.out.println("Insert User DB");
		}
		return result;
	}

	public int checkUserInputForm(Users user) {
		if (getJdbcTemplate()
				.query("SELECT * FROM users WHERE email = ?", new Object[] { user.getEmail() }, new UserMapper())
				.size() == 0) {
			if (getJdbcTemplate()
					.query("SELECT * FROM role WHERE rid = ?", new Object[] { user.getRid() }, new RoleMapper())
					.size() != 0) {
				return 1;
			} else {
				return -1;
			}
		} else {
			return 0;
		}
	}

	public int updateUser(int uid, Users user) {
		if (getJdbcTemplate().query("SELECT * FROM users WHERE uid = ?", new Object[] { uid }, new UserMapper())
				.size() != 0) {
			int result = checkUserInputForm(user);
			if (result == 1) {
				getJdbcTemplate().update(
						"UPDATE users SET uid = ?, email = ?, name = ?, password = ?, rid = ? WHERE uid = ?",
						new Object[] { uid, user.getEmail(), user.getName(), user.getPassword(), user.getRid(), uid });
				System.out.println("Update User DB");
			}
			return result;
		}
		return -2;
	}

	public int deleteUser(int uid) {
		int deletedItemNumber = getJdbcTemplate().update("DELETE FROM users WHERE uid = ?", new Object[] { uid });
		if (deletedItemNumber != 0) {
			getJdbcTemplate().update("DELETE FROM userbook WHERE uid = ?", new Object[] { uid });
			System.out.println("Delete User DB");
			return deletedItemNumber;
		}
		return 0;
	}
	
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
}
