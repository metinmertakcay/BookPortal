package com.obss.dao;

import java.util.List;

import com.obss.models.Book;
import com.obss.models.ShowBook;
import com.obss.models.Users;
import com.obss.models.Writer;

public interface UserDao {

	public List<Book> findAllBook();

	public int getBookInsideList(int uid, int bid);

	public void addBookInsideReadList(int uid, int bid);

	public void addBookInsideFavouriteList(int uid, int bid);

	public List<Book> searchBook(String name);

	public List<Users> searchUser(String name);

	public int saveBook(Book book);

	public int deleteBook(int bid);

	public int updateBook(int bid, Book book);

	public int saveWriter(Writer writer);

	public int deleteWriter(int wid);

	public int updateWriter(int wid, Writer writer);

	public int saveUser(Users user);

	public int deleteUser(int uid);

	public int updateUser(int uid, Users user);

	public List<ShowBook> getBooks(String bookName);

	public List<ShowBook> getAllBooks();
}
