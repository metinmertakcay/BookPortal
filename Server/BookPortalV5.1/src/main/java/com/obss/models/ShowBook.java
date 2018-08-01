package com.obss.models;

public class ShowBook {
	private String userName;
	private String writerName;
	private String writerSurname;
	private String bookName;

	public ShowBook() {

	}

	public ShowBook(String userName, String writerName, String writerSurname, String bookName) {
		this.userName = userName;
		this.writerName = writerName;
		this.setWriterSurname(writerSurname);
		this.bookName = bookName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getWriterName() {
		return writerName;
	}

	public void setWriterName(String writerName) {
		this.writerName = writerName;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getWriterSurname() {
		return writerSurname;
	}

	public void setWriterSurname(String writerSurname) {
		this.writerSurname = writerSurname;
	}
}
