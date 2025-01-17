package com.example.skillsphere.jwt;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.skillsphere.model.Creator;
import com.example.skillsphere.model.User;
import com.example.skillsphere.repository.CreatorRepository;
import com.example.skillsphere.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CreatorRepository creatorRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email);
		if (user != null) {
			return new CustomUserDetails(user.getId(), user.getEmail(), "{noop}" + user.getPassword(), 
			Collections.singletonList(new SimpleGrantedAuthority(user.getRole())));
		}

		Creator creator = creatorRepository.findByEmail(email);
		if (creator != null) {
			return new CustomUserDetails(creator.getCreatorId(), creator.getEmail(), "{noop}" + creator.getPassword(), 
					Collections.singletonList(new SimpleGrantedAuthority(creator.getRole())));
		}
		throw new UsernameNotFoundException("User not found with email: " + email);
	}

}
