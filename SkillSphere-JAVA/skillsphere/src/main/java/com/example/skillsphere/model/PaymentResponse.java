package com.example.skillsphere.model;

public class PaymentResponse {
    private Payment payment;
    private String approvalUrl;

    public PaymentResponse(Payment payment, String approvalUrl) {
        this.payment = payment;
        this.approvalUrl = approvalUrl;
    }

    public Payment getPayment() {
        return payment;
    }

    public String getApprovalUrl() {
        return approvalUrl;
    }
}
