package com.example.skillsphere.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.skillsphere.model.Consultation;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
	 List<Consultation> findByCreator_CreatorId(Long creatorId);
}
