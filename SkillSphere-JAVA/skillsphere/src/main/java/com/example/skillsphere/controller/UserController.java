package com.example.skillsphere.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.skillsphere.model.User;
import com.example.skillsphere.service.AuthService;
import com.example.skillsphere.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

    @Autowired
    private AuthService authService;
    
	@GetMapping("/users")
	 @PreAuthorize("hasRole('ROLE_USER')")
	public List<User> retrieveAllUsers() {
		return this.userService.findAll();
	}

	@PostMapping("/users")
	public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
		return this.userService.save(user);
	}

	@GetMapping("/users/{id}")
	 @PreAuthorize("hasRole('ROLE_USER')")
	public EntityModel<User> findUser(@PathVariable long id) {
		authService.checkUserOwnership(id);
		return this.userService.findById(id);
	}

	@DeleteMapping("/users/{id}")
	 @PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<User> deleteUser(@PathVariable long id) {
		authService.checkUserOwnership(id);
		return this.userService.deleteUserById(id);
	}

	@PutMapping("/users/{id}")
	 @PreAuthorize("hasRole('ROLE_USER')")
	public User updateUser(@PathVariable long id, @Valid @RequestBody User user) {
		authService.checkUserOwnership(id);
		return this.userService.updateUser(id, user);
	}
}
