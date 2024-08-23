package com.example.skillsphere.config;

import com.paypal.core.PayPalEnvironment;

public class CustomPayPalEnvironment extends PayPalEnvironment.Sandbox {

    public CustomPayPalEnvironment(String clientId, String clientSecret) {
        super(clientId, clientSecret);
    }

    @Override
    public String baseUrl() {
        return "https://api-m.sandbox.paypal.com"; // Override with your custom API URL
    }
}
