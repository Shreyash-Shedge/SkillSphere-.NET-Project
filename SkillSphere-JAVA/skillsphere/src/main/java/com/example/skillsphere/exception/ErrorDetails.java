package com.example.skillsphere.exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Data
public class ErrorDetails {
	
	public ErrorDetails(String message) {
		this.message = message;
	}
	private LocalDateTime timestamp;
	private String message;
	private String description;
}
