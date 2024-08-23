package com.example.skillsphere.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.skillsphere.model.Video;

public interface VideoRepository extends JpaRepository<Video, Long> {

}
