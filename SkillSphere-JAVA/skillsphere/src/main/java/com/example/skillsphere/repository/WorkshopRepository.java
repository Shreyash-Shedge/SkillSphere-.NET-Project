package com.example.skillsphere.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.skillsphere.model.Workshop;

public interface WorkshopRepository extends JpaRepository<Workshop, Long> {
	 List<Workshop> findByCreatorCreatorId(Long creatorId);
}
