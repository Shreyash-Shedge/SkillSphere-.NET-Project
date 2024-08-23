package com.example.skillsphere.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CreatorNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public CreatorNotFoundException(String message) {
		super(message);
	}

}
