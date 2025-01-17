package com.example.skillsphere.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Purchase {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long purchaseId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private User user;

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnoreProperties("purchases")
	private Course course;

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnoreProperties("purchases")
	private Consultation consultation;

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnoreProperties("purchases")
	private Workshop workshop;
	
    @ManyToOne(fetch = FetchType.LAZY)  // Add the relationship to Payment
    @JsonIgnore
    private Payment payment;

	@Column(nullable = false)
	private BigDecimal amount;

	@Column(nullable = false)
	private String paymentStatus;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	@Column(nullable = false)
	private LocalDateTime updatedAt;
}
