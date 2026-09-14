package org.example.edutechlite.service;

import org.example.edutechlite.entity.Incident;
import org.example.edutechlite.entity.SeverityLevel;
import org.example.edutechlite.repository.IncidentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public Incident createIncident(Incident incident) {
        incident.setCreatedAt(LocalDateTime.now());
        if (incident.getStatus() == null) {
            incident.setStatus("PENDING");
        }
        return incidentRepository.save(incident);
    }

    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    public List<Incident> getHighSeverityIncidents() {
        return incidentRepository.findBySeverity(SeverityLevel.HIGH);
    }
}