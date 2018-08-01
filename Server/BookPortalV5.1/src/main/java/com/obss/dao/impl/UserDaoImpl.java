package com.obss.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.obss.dao.UserDao;
import com.obss.enumeration.State;
import com.obss.enumeration.Error;
import com.obss.mapper.BookMapper;
import com.obss.mapper.RoleMapper;
import com.obss.mapper.UserBookMapper;
import com.obss.mapper.UserMapper;
import com.obss.mapper.WriterMapper;
import com.obss.models.Book;
import com.obss.models.EncodePassword;
import com.obss.models.ShowBook;
import com.obss.models.UserBook;
import com.obss.models.Users;
import com.obss.models.Writer;

@Repository("userDaoImpl")
public class UserDaoImpl implements UserDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List<Book> findAllBook() {
		List<Book> books = new ArrayList<Book>();
		List<Map<String, Object>> rows = jdbcTemplate.queryForList("SELECT * FROM book");

		for (Map<String, Object> row : rows) {
			Book book = new Book();
			book.setBid((Integer) (row.get("bid")));
			book.setUid((Integer) (row.get("uid")));
			book.setWid((Integer) (row.get("wid")));
			book.setName((String) (row.get("name")));
			books.add(book);
		}

		return books;
	}

	public int getBookInsideList(int uid, int bid) {
		ArrayList<UserBook> userbook = (ArrayList<UserBook>) getJdbcTemplate().query(
				"SELECT * FROM userbook WHERE uid = ? AND bid = ?", new Object[] { uid, bid }, new UserBookMapper());
		if (userbook.size() != 0) {
			return userbook.get(0).getSid();
		} else {
			return State.EMPTY.getNumber();
		}
	}

	public void addBookInsideReadList(int uid, int bid) {
		checkBookInsideList(uid, bid, State.READ.getNumber());
	}

	public void addBookInsideFavouriteList(int uid, int bid) {
		checkBookInsideList(uid, bid, State.FAVOURITE.getNumber());
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

	public List<Book> searchBook(String name) {
		List<Book> books = (List<Book>) getJdbcTemplate().query("SELECT * FROM book WHERE name = ?",
				new Object[] { name }, new BookMapper());
		return books;
	}

	public List<Users> searchUser(String name) {
		List<Users> users = (List<Users>) getJdbcTemplate().query("SELECT * FROM users WHERE name = ?",
				new Object[] { name }, new UserMapper());
		return users;
	}

	public int saveBook(Book book) {
		int result = checkBookInputForm(book);
		if (result == Error.OK.getNumber()) {
			result = getJdbcTemplate().update("INSERT INTO book (uid, wid, name) VALUES (?, ?, ?)",
					new Object[] { book.getUid(), book.getWid(), book.getName() });
		}
		return result;

	}

	public int checkBookInputForm(Book book) {
		if (searchBookAddingPreviously(book.getWid(), book.getName()) == 0) {
			if (searchWriter(book.getWid()) != 0) {
				if (searchUser(book.getUid()) != 0) {
					return Error.OK.getNumber();
				} else {
					return Error.USER_NOT_FOUND.getNumber();
				}
			} else {
				return Error.WRITER_NOT_FOUND.getNumber();
			}
		} else {
			return Error.BOOK_ADDING_BEFORE.getNumber();
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
			if (result == Error.OK.getNumber()) {
				result = getJdbcTemplate().update("UPDATE book SET bid = ?, uid = ?, wid = ?, name = ? WHERE bid = ?",
						new Object[] { bid, book.getUid(), book.getWid(), book.getName(), bid });
			}
			return result;
		}
		return Error.BOOK_NOT_FOUND.getNumber();
	}

	public int deleteBook(int bid) {
		int deletedItemNumber = getJdbcTemplate().update("DELETE FROM book WHERE bid = ?", new Object[] { bid });
		if (deletedItemNumber != 0) {
			getJdbcTemplate().update("DELETE FROM userbook WHERE bid = ?", new Object[] { bid });
			return deletedItemNumber;
		}
		return Error.BOOK_NOT_FOUND.getNumber();
	}

	public int saveWriter(Writer writer) {
		if (getJdbcTemplate().query("SELECT * FROM writer WHERE name = ? AND surname = ?",
				new Object[] { writer.getName(), writer.getSurname() }, new WriterMapper()).size() == 0) {
			getJdbcTemplate().update("INSERT INTO writer (name, surname) VALUES(?, ?)",
					new Object[] { writer.getName(), writer.getSurname() });
			return Error.OK.getNumber();
		}
		return Error.WRITER_ADDING_BEFORE.getNumber();
	}

	public int updateWriter(int wid, Writer writer) {
		if (getJdbcTemplate().query("SELECT * FROM writer WHERE wid = ?", new Object[] { wid }, new WriterMapper())
				.size() != 0) {
			getJdbcTemplate().update("UPDATE writer SET wid = ?, name = ?, surname = ? WHERE wid = ?",
					new Object[] { wid, writer.getName(), writer.getSurname(), wid });
			return Error.OK.getNumber();
		}
		return Error.WRITER_NOT_FOUND.getNumber();
	}

	public int deleteWriter(int wid) {
		int deletedItemNumber = getJdbcTemplate().update("UPDATE book SET wid = ? WHERE wid = ?",
				new Object[] { null, wid });
		if (deletedItemNumber != 0) {
			getJdbcTemplate().update("DELETE FROM writer WHERE wid = ?", wid);
			return deletedItemNumber;
		}
		return Error.WRITER_NOT_FOUND.getNumber();
	}

	public int saveUser(Users user) {
		int result = checkUserInputForm(user);
		if (result == Error.OK.getNumber()) {
			getJdbcTemplate().update("INSERT INTO users (email, name, password, rid) VALUES(?, ?, ?, ?)", new Object[] {
					user.getEmail(), user.getName(), EncodePassword.encode(user.getPassword()), user.getRid() });
		}
		return result;
	}

	public int updateUser(int uid, Users user) {
		if (getJdbcTemplate().query("SELECT * FROM users WHERE uid = ?", new Object[] { uid }, new UserMapper())
				.size() != 0) {
			int result = checkUserInputForm(user);
			if (result == Error.OK.getNumber()) {
				getJdbcTemplate().update(
						"UPDATE users SET uid = ?, email = ?, name = ?, password = ?, rid = ? WHERE uid = ?",
						new Object[] { uid, user.getEmail(), user.getName(), EncodePassword.encode(user.getPassword()),
								user.getRid(), uid });
			}
			return result;
		}
		return Error.USER_NOT_FOUND.getNumber();
	}

	public int deleteUser(int uid) {
		int deletedItemNumber = getJdbcTemplate().update("DELETE FROM users WHERE uid = ?", new Object[] { uid });
		if (deletedItemNumber != 0) {
			getJdbcTemplate().update("DELETE FROM userbook WHERE uid = ?", new Object[] { uid });
			return deletedItemNumber;
		}
		return Error.USER_NOT_FOUND.getNumber();
	}

	public int checkUserInputForm(Users user) {
		if (getJdbcTemplate()
				.query("SELECT * FROM users WHERE email = ?", new Object[] { user.getEmail() }, new UserMapper())
				.size() == 0) {
			if (getJdbcTemplate()
					.query("SELECT * FROM role WHERE rid = ?", new Object[] { user.getRid() }, new RoleMapper())
					.size() != 0) {
				return Error.OK.getNumber();
			} else {
				return Error.WRONG_ROLE_ID.getNumber();
			}
		} else {
			return Error.USED_EMAIL.getNumber();
		}
	}

	public List<ShowBook> getBooks(String bookName) {
		List<ShowBook> sbooks = new ArrayList<ShowBook>();
		List<Book> books = searchBook(bookName);

		if (books.size() != 0) {
			int i = 0;
			while (i < books.size()) {
				String userName = getJdbcTemplate().query("SELECT * FROM users WHERE uid = ?",
						new Object[] { books.get(i).getUid() }, new UserMapper()).get(0).getName();

				Writer writer = (Writer)getJdbcTemplate().query("SELECT * FROM writer WHERE wid = ?",
						new Object[] { books.get(i).getWid() }, new WriterMapper()).get(0);

				sbooks.add(new ShowBook(userName, writer.getName(), writer.getSurname(), bookName));

				i++;
			}
			return sbooks;
		} else {
			return null;
		}
	}

	public List<ShowBook> getAllBooks() {
		List<ShowBook> sbooks = new ArrayList<ShowBook>();
		List<Book> books = findAllBook();

		if (books.size() != 0) {
			int i = 0;
			while (i < books.size()) {
				String userName = getJdbcTemplate().query("SELECT * FROM users WHERE uid = ?",
						new Object[] { books.get(i).getUid() }, new UserMapper()).get(0).getName();

				Writer writer = (Writer) getJdbcTemplate().query("SELECT * FROM writer WHERE wid = ?",
						new Object[] { books.get(i).getWid() }, new WriterMapper()).get(0);

				sbooks.add(new ShowBook(userName, writer.getName(), writer.getSurname() ,books.get(i).getName()));

				i++;
			}
			return sbooks;
		} else {
			return null;
		}
	}

	public List<Book> getUserList(int sid) {
		List<UserBook> userbook = (List<UserBook>) getJdbcTemplate().query(
				"SELECT * FROM userbook WHERE uid = ? AND sid = ?", new Object[] { 3, sid }, new UserBookMapper());
		List<Book> books = new ArrayList<>();

		int i = 0;
		while (i < userbook.size()) {
			books.add(getJdbcTemplate().query("SELECT * FROM book WHERE bid = ?",
					new Object[] { userbook.get(i).getBid() }, new BookMapper()).get(0));
			i++;
		}
		return books;
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
}
