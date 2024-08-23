package com.example.skillsphere.config;

import com.paypal.core.PayPalHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PayPalConfig {

    @Value("${paypal.clientId}")
    private String clientId;

    @Value("${paypal.clientSecret}")
    private String clientSecret;

    @Bean
    public CustomPayPalEnvironment customPayPalEnvironment() {
        return new CustomPayPalEnvironment(clientId, clientSecret);
    }

    @Bean
    public PayPalHttpClient payPalHttpClient(CustomPayPalEnvironment environment) {
        return new PayPalHttpClient(environment);
    }
}
