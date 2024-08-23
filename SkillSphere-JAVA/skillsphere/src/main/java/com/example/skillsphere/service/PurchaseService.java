package com.example.skillsphere.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.skillsphere.model.Purchase;
import com.example.skillsphere.repository.PurchaseRepository;

@Service
public class PurchaseService {

	@Autowired
	private PurchaseRepository purchaseRepository;

	public List<Purchase> findCoursePurchasesByUserId(Long userId) {
		return purchaseRepository.findByUserIdAndCourseIsNotNull(userId);
	}

	public List<Purchase> findConsultationPurchasesByUserId(Long userId) {
		return purchaseRepository.findByUserIdAndConsultationIsNotNull(userId);
	}

	public List<Purchase> findWorkshopPurchasesByUserId(Long userId) {
		return purchaseRepository.findByUserIdAndWorkshopIsNotNull(userId);
	}
}