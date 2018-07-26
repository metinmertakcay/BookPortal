package com.obss.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.obss.models.Writer;
import com.obss.service.UserService;

@Controller
@ResponseBody
@RequestMapping("/rest/writer")
public class WriterRestController {

	@Autowired
	@Qualifier("userServiceImpl")
	private UserService userService;

	@PostMapping
	public int saveWriter(@RequestBody Writer writer) {
		return userService.saveWriter(writer);
	}

	@PutMapping("/{wid}")
	public int updateWriter(@PathVariable int wid, @RequestBody Writer writer) {
		return userService.updateWriter(wid, writer);
	}

	@DeleteMapping("/{wid}")
	public int deleteWriter(@PathVariable int wid) {
		return userService.deleteWriter(wid);
	}
}
