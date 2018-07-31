package com.obss.config;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.obss.security.JwtAuthenticationEntryPoint;
import com.obss.security.JwtAuthenticationProvider;
import com.obss.security.JwtAuthenticationTokenFilter;
import com.obss.security.JwtSuccessHandler;

@EnableWebMvc
@Configuration
@ComponentScan("com.obss")
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@PropertySource(value = { "classpath:application.properties" })
public class Config extends WebSecurityConfigurerAdapter {

	@Autowired
	private Environment env;

	@Autowired
	private JwtAuthenticationProvider authenticationProvider;

	@Autowired
	private JwtAuthenticationEntryPoint entryPoint;

	@Bean
	public DataSource dataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(env.getRequiredProperty("jdbc.driver"));
		dataSource.setUrl(env.getRequiredProperty("jdbc.url"));
		dataSource.setUsername(env.getRequiredProperty("jdbc.username"));
		dataSource.setPassword(env.getRequiredProperty("jdbc.password"));
		return dataSource;
	}

	@Bean
	public JdbcTemplate jdbcTemplate(DataSource dataSource) {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		jdbcTemplate.setResultsMapCaseInsensitive(true);
		return jdbcTemplate;
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManager() {
		List<AuthenticationProvider> providers = new ArrayList<AuthenticationProvider>();
		providers.add(authenticationProvider);
		return new ProviderManager(providers);
	}

	@Bean
	public JwtAuthenticationTokenFilter authenticationTokenFilter() {
		JwtAuthenticationTokenFilter filter = new JwtAuthenticationTokenFilter();
		filter.setAuthenticationManager(authenticationManager());
		filter.setAuthenticationSuccessHandler(new JwtSuccessHandler());
		return filter;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

	     http
	        .cors().and()
	        .authorizeRequests()
	        	.antMatchers(HttpMethod.OPTIONS).permitAll()
	        .and()
	        .authorizeRequests()
	        	.antMatchers("/rest/user/**").authenticated()
	        	.antMatchers("/rest/book/**").authenticated()
	        	.antMatchers("/rest/writer/**").authenticated()
	        .and()
	        	.exceptionHandling().authenticationEntryPoint(entryPoint)
	        .and()
	        	.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	     	.and()
	        .csrf().disable();

	     http.headers().cacheControl();

		http.addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
      return new WebMvcConfigurerAdapter() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
          registry.addMapping("/**").allowedOrigins("*").allowedMethods("POST", "GET", "PUT", "DELETE");
        }
      };
    }

}
