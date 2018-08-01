package com.obss.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.obss.models.Book;
import com.obss.models.JwtUserDetails;
import com.obss.models.ShowBook;
import com.obss.service.UserService;

@Controller
@ResponseBody
@RequestMapping("/rest/book")
public class BookRestController {

	@Autowired
	private JwtUserDetails JwtUserDetails;

	@Autowired
	@Qualifier("userServiceImpl")
	private UserService userService;

	@GetMapping
	public List<Book> findAllBook() {
		return userService.findAllBook();
	}

	@GetMapping("/{name}")
	public List<Book> searchBook(@PathVariable String name) {
		return userService.searchBook(name);
	}

	@PostMapping
	public int saveBook(@RequestBody Book book) {
		return userService.saveBook(book);
	}

	@PutMapping("/{bid}")
	public int updateBook(@PathVariable int bid, @RequestBody Book book) {
		return userService.updateBook(bid, book);
	}

	@GetMapping("/{uid}/{bid}")
	public int getBookInsideList(@PathVariable int uid, @PathVariable int bid) {
		return userService.getBookInsideList(uid, bid);
	}

	// Verilecek sayý deðeri yapýlacak iþleri gösterecektir.
	// Kiþinin uid ve bid eriþilmesi gerekir.
	@PostMapping("/{uid}/{bid}/{sid}")
	public void addListBook(@PathVariable int uid, @PathVariable int bid, @PathVariable int sid) {
		if (sid == 1) {
			userService.addBookInsideReadList(uid, bid);
		} else {
			userService.addBookInsideFavouriteList(uid, bid);
		}
	}

	@DeleteMapping("/{bid}")
	public int deleteBook(@PathVariable int bid) {
		return userService.deleteBook(bid);
	}

	@GetMapping("/get")
	public List<ShowBook> getAllBooks() {
		return userService.getAllBooks();
	}

	@GetMapping("/get/{name}")
	public List<ShowBook> getBooks(@PathVariable String name) {
		return userService.getBooks(name);
	}

	@GetMapping("/list/{sid}")
	public List<Book> getUserList(@PathVariable int sid) {
		return userService.getUserList(sid);
	}
}
