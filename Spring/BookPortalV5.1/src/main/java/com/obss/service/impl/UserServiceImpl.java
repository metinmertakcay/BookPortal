package com.obss.service.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.obss.dao.UserDao;
import com.obss.models.Book;
import com.obss.models.Users;
import com.obss.models.Writer;
import com.obss.service.UserService;

@Service("userServiceImpl")
public class UserServiceImpl implements UserService {

	@Autowired
	@Qualifier("userDaoImpl")
	private UserDao userDao;

	public ArrayList<Book> findAllBook() {
		return userDao.findAllBook();
	}

	public int getBookInsideList(int uid, int bid) {
		return userDao.getBookInsideList(uid, bid);
	}
	
	public void addBookInsideReadList(int uid, int bid) {
		userDao.addBookInsideReadList(uid, bid);
	}

	public void addBookInsideFavouriteList(int uid, int bid) {
		userDao.addBookInsideFavouriteList(uid, bid);
	}

	public ArrayList<Book> searchBook(String name) {
		return userDao.searchBook(name);
	}

	public ArrayList<Users> searchUser(String name) {
		return userDao.searchUser(name);
	}

	public int saveBook(Book book) {
		return userDao.saveBook(book);
	}

	public int deleteBook(int bid) {
		return userDao.deleteBook(bid);
	}

	public int updateBook(int bid, Book book) {
		return userDao.updateBook(bid, book);
	}

	public int saveWriter(Writer writer) {
		return userDao.saveWriter(writer);
	}

	public int deleteWriter(int wid) {
		return userDao.deleteWriter(wid);
	}

	public int updateWriter(int wid, Writer writer) {
		return userDao.updateWriter(wid, writer);
	}

	public int saveUser(Users user) {
		return userDao.saveUser(user);
	}

	public int deleteUser(int uid) {
		return userDao.deleteUser(uid);
	}

	public int updateUser(int uid, Users user) {
		return userDao.updateUser(uid, user);
	}
}
