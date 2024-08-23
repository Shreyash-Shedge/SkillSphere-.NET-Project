package com.example.skillsphere.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.skillsphere.model.Creator;
import com.example.skillsphere.model.User;

@Service
public class AuthService {

    private final UserService userService;
    
    private final CreatorService creatorService;

    public AuthService(UserService userService,CreatorService creatorService) {
        this.userService = userService;
        this.creatorService = creatorService;
    }

    public void checkUserOwnership(long userId) {
        // Get the currently authenticated user's email
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authenticatedEmail = authentication.getName();

        // Retrieve the user by ID
        User user = userService.findById(userId).getContent();

        // Check if the authenticated user's email matches the email of the user being accessed
        if (!user.getEmail().equals(authenticatedEmail)) {
            throw new RuntimeException("Access Denied: You are not allowed to access or modify this user's details.");
        }
    }
    
    public void checkCreatorOwnership(long creatorId) {
        // Get the currently authenticated user's email
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authenticatedEmail = authentication.getName();

        // Retrieve the creator by ID
        Creator creator = creatorService.findById(creatorId).getContent();

        // Check if the authenticated user's email matches the email of the creator being accessed
        if (!creator.getEmail().equals(authenticatedEmail)) {
            throw new RuntimeException("Access Denied: You are not allowed to access or modify this creator's details.");
        }
    }
}
