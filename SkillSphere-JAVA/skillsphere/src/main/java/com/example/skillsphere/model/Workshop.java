package com.example.skillsphere.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.example.skillsphere.annotations.FutureOrToday;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Workshop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workshopId;

    @NotNull(message = "Title is required")
    @Size(min = 1, max = 255, message = "Title must be between 1 and 255 characters")
    private String title;

    @Size(max = 1000, message = "Description can be up to 1000 characters")
    private String description;

    @Min(value = 1, message = "Duration must be at least 1 minute")
    @Max(value = 1440, message = "Duration cannot exceed 1440 minutes (24 hours)")
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
    @FutureOrToday(message = "Start date must be today or in the future")
    private LocalDate endDate; 

    @NotNull(message = "Start time is required")
    private LocalTime startTime; 

    @NotNull(message = "End time is required")
    private LocalTime endTime; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Creator creator; 

    @ElementCollection
    @NotEmpty(message = "At least one topic is required")
    private List<String> topicsCovered;  

    @NotNull(message = "Maximum participants is required")
    @Min(value = 1, message = "There must be at least 1 participant")
    private int maxParticipants; 

    @NotNull(message = "Registration deadline is required")
    private LocalDateTime registrationDeadline;  
    
    @OneToMany(mappedBy = "workshop", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnore 
    private List<Purchase> purchases;
}
