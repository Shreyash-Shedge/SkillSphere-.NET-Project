package com.example.skillsphere.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.example.skillsphere.annotations.FutureOrToday;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long consultationId;

    @NotNull(message = "Title is required")
    @Size(min = 1, max = 255, message = "Title must be between 1 and 255 characters")
    private String title;

    @Size(max = 1000, message = "Description can be up to 1000 characters")
    private String description;

    @Min(value = 1, message = "Slots per user must be at least 1")
    private int slotsPerUser;

    @Min(value = 1, message = "Duration must be at least 1 minute")
    private int duration;

    @NotNull(message = "Call platform is required")
    @Size(min = 1, max = 100, message = "Call platform must be between 1 and 100 characters")
    private String callPlatform;

    @NotNull(message = "External link is required")
    @Pattern(
        regexp = "^(https://meet\\.google\\.com/|https://zoom\\.us/).*$",
        message = "Invalid external link. Only Google Meet or Zoom links are allowed."
    )
    private String externalLink;

    @NotNull(message = "Price is required")
    @Min(value = 50, message = "Price must be greater than or equal to 50")
    private Double price;

    @NotNull(message = "Start date is required")
    @FutureOrToday(message = "Start date must be today or in the future")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    @FutureOrToday(message = "End date must be today or in the future")
    private LocalDate endDate;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    @NotNull(message = "End time is required")
    private LocalTime endTime;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Creator creator;
    
    @OneToMany(mappedBy = "consultation", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnore 
    private List<Purchase> purchases;
}