package com.example.skillsphere.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.skillsphere.exception.PaymentNotFoundException;
import com.example.skillsphere.model.Payment;
import com.example.skillsphere.model.PaymentResponse;
import com.example.skillsphere.repository.PaymentRepository;
import com.example.skillsphere.service.PaymentService;
import com.paypal.orders.Order;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/payments")
@Slf4j
public class PaymentController {

	@Autowired
	private PaymentService paymentService;

	@Autowired
	private PaymentRepository paymentRepository;

	@GetMapping("/status/{orderId}")
	public ResponseEntity<Map<String, String>> checkPaymentStatus(@PathVariable String orderId) {
		Map<String, String> response = new HashMap<>();
		try {
			Order order = paymentService.getOrder(orderId);
			String status = order.status();

			response.put("status", status);
			response.put("message", "Payment status retrieved successfully");

			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.put("status", "error");
			response.put("message", "Error retrieving payment status: " + e.getMessage());
			return ResponseEntity.status(500).body(response);
		}
	}

	@GetMapping("/{userId}")
	@PreAuthorize("hasAuthority('SCOPE_USER')")
	public ResponseEntity<List<Payment>> getAllPaymentsByUserId(@PathVariable Long userId) {
		return ResponseEntity.ok(paymentService.getAllPaymentsByUserId(userId));
	}

	@PostMapping("/create/{userId}/course/{courseId}")
	@PreAuthorize("hasAuthority('SCOPE_USER')")
	public ResponseEntity<PaymentResponse> createPayment(@PathVariable Long userId, @PathVariable Long courseId)
			throws IOException {
		return ResponseEntity.ok(paymentService.createPayment(userId, courseId)).getBody();
	}

	@PostMapping("/create/{userId}/consultation/{consultationId}")
	@PreAuthorize("hasAuthority('SCOPE_USER')")
	public ResponseEntity<PaymentResponse> createPaymentForConsultation(@PathVariable Long userId,
			@PathVariable Long consultationId) throws IOException {
		return ResponseEntity.ok(paymentService.createPaymentForConsultation(userId, consultationId)).getBody();
	}

	@PostMapping("/create/{userId}/workshop/{workshopId}")
	@PreAuthorize("hasAuthority('SCOPE_USER')")
	public ResponseEntity<PaymentResponse> createPaymentForWorkshop(@PathVariable Long userId,
			@PathVariable Long workshopId) throws IOException {
		return ResponseEntity.ok(paymentService.createPaymentForWorkshop(userId, workshopId)).getBody();
	}

	@GetMapping("/success")
	public ResponseEntity<?> paymentSuccess(@RequestParam("token") String orderId,
			@RequestParam("PayerID") String payerId) {
		try {
			Payment payment = paymentRepository.findByOrderId(orderId);
			if (payment == null) {
				throw new PaymentNotFoundException("Payment not found");
			}

			log.info("Payment found for order ID: {}, processing...", orderId);
			paymentService.captureOrder(payment, orderId);

			Long productId = paymentService.getProductId(payment);
			String productType = paymentService.getProductType(payment);

			// Returning additional data to the frontend
			Map<String, Object> response = new HashMap<>();
			response.put("message", "Payment Success and Purchase Recorded");
			response.put("orderId", productId);
			response.put("type", productType);
			response.put("status", "success");

			return ResponseEntity.ok(response);
		} catch (IOException e) {
			log.error("IOException during payment processing: {}", e.getMessage());
			Map<String, Object> response = new HashMap<>();
			response.put("message", "Payment Failure: " + e.getMessage());
			response.put("status", "failure");

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@DeleteMapping("/{userId}/{paymentId}")
	@PreAuthorize("hasAuthority('SCOPE_USER')")
	public ResponseEntity<Void> refundPayment(@PathVariable Long userId, @PathVariable Long paymentId) {
		paymentService.refundPayment(paymentId, userId);
		return ResponseEntity.noContent().build();
	}
}