package com.obss.models;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;

	private static JwtUserDetails instance = new JwtUserDetails();

	private Users user;
	private String token;
	private Collection<? extends GrantedAuthority> authorities;

	private JwtUserDetails() {
	}

	public static JwtUserDetails getInstance() {
		return instance;
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	public boolean isAccountNonExpired() {
		return true;
	}

	public boolean isAccountNonLocked() {
		return true;
	}

	public boolean isCredentialsNonExpired() {
		return true;
	}

	public boolean isEnabled() {
		return true;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public String getUsername() {
		return user.getName();
	}

	public String getPassword() {
		return user.getPassword();
	}
}