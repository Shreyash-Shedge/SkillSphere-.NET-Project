package com.example.skillsphere.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.skillsphere.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
