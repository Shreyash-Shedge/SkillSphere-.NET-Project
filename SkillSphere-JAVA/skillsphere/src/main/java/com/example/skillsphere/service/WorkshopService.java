package com.example.skillsphere.service;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.skillsphere.exception.CreatorNotFoundException;
import com.example.skillsphere.exception.WorkshopNotFoundException;
import com.example.skillsphere.model.Creator;
import com.example.skillsphere.model.Workshop;
import com.example.skillsphere.repository.WorkshopRepository;

import jakarta.validation.Valid;

@Service
public class WorkshopService {

    @Autowired
    private WorkshopRepository workshopRepository;

    @Autowired
    private CreatorService creatorService;

    private Workshop validateWorkshop(Long creatorId, Long workshopId) {
        Workshop workshop = workshopRepository.findById(workshopId)
                .orElseThrow(() -> new WorkshopNotFoundException("Workshop with ID: " + workshopId + " does not exist"));

        if (!workshop.getCreator().getCreatorId().equals(creatorId)) {
            throw new CreatorNotFoundException("Creator with ID: " + creatorId + " does not exist");
        }
        return workshop;
    }

    public List<Workshop> findWorkshopsForCreator(Long creatorId) {
        creatorService.validateCreator(creatorId);
        return workshopRepository.findByCreatorCreatorId(creatorId);
    }

    public ResponseEntity<Workshop> save(Long creatorId, @Valid Workshop workshop) {
        Creator creator = creatorService.validateCreator(creatorId);
        workshop.setCreator(creator);

        Workshop savedWorkshop = workshopRepository.save(workshop);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(savedWorkshop.getWorkshopId()).toUri();
        return ResponseEntity.created(location).body(savedWorkshop);
    }

    public Workshop findWorkshopByCreatorId(Long creatorId, Long workshopId) {
        return validateWorkshop(creatorId, workshopId);
    }

    public ResponseEntity<Workshop> deleteWorkshopForCreator(Long creatorId, Long workshopId) {
        validateWorkshop(creatorId, workshopId);
        workshopRepository.deleteById(workshopId);
        return ResponseEntity.noContent().build();
    }

    public Workshop updateWorkshopForCreator(Long creatorId, Long workshopId,
                                             @Valid Workshop workshop) {
        Workshop existingWorkshop = validateWorkshop(creatorId, workshopId);
        existingWorkshop.setTitle(workshop.getTitle());
        existingWorkshop.setDescription(workshop.getDescription());
        existingWorkshop.setDuration(workshop.getDuration());
        existingWorkshop.setCallPlatform(workshop.getCallPlatform());
        existingWorkshop.setExternalLink(workshop.getExternalLink());
        existingWorkshop.setPrice(workshop.getPrice());
        existingWorkshop.setStartDate(workshop.getStartDate());
        existingWorkshop.setEndDate(workshop.getEndDate());
        existingWorkshop.setStartTime(workshop.getStartTime());
        existingWorkshop.setEndTime(workshop.getEndTime());
        existingWorkshop.setTopicsCovered(workshop.getTopicsCovered());
        existingWorkshop.setMaxParticipants(workshop.getMaxParticipants());
        existingWorkshop.setRegistrationDeadline(workshop.getRegistrationDeadline());
        return workshopRepository.save(existingWorkshop);
    }

	public List<Workshop> findAll() {
		return workshopRepository.findAll();
	}
}
