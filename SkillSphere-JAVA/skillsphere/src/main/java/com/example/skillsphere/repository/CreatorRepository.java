package com.example.skillsphere.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.skillsphere.model.Creator;

public interface CreatorRepository extends JpaRepository<Creator, Long> {
	 Creator findByEmail(String email);
}
