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

import com.obss.models.Users;
import com.obss.service.UserService;

@Controller
@ResponseBody
@RequestMapping("/rest/user")
public class UserRestController {

	@Autowired
	@Qualifier("userServiceImpl")
	private UserService userService;
	
	@GetMapping("/{name}")
	public ArrayList<Users> searchUser(@PathVariable String name) {
		return userService.searchUser(name);
	}

	@PostMapping
	public int saveUser(@RequestBody Users user) {
		return userService.saveUser(user);
	}

	@PutMapping("/{uid}")
	public int updateUser(@PathVariable int uid, @RequestBody Users user) {
		return userService.updateUser(uid, user);
	}

	@DeleteMapping("/{uid}")
	public int deleteUser(@PathVariable int uid) {
		return userService.deleteUser(uid);
	}
}
