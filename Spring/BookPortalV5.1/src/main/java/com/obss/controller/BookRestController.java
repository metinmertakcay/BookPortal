package com.obss.controller;

import java.util.ArrayList;

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
	public ArrayList<Book> findAllBook() {
		return userService.findAllBook();
	}

	@GetMapping("/{name}")
	public ArrayList<Book> searchBook(@PathVariable String name) {
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

	// Verilecek say� de�eri yap�lacak i�leri g�sterecektir.
	// Ki�inin uid ve bid eri�ilmesi gerekir.
	@PostMapping("/{sid}/{bid}")
	public void addListBook(@PathVariable int sid, @PathVariable int bid) {
		if (sid == 1) {
			userService.addBookInsideReadList(JwtUserDetails.getUser().getUid(), bid);
		} else {
			userService.addBookInsideFavouriteList(JwtUserDetails.getUser().getUid(), bid);
		}
	}

	@DeleteMapping("/{bid}")
	public int deleteBook(@PathVariable int bid) {
		return userService.deleteBook(bid);
	}
}