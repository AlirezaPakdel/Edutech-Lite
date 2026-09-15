package org.example.edutechlite.controller;

import org.example.edutechlite.dto.IncidentRequestDTO;
import org.example.edutechlite.dto.IncidentResponseDTO;
import org.example.edutechlite.entity.Incident;
import org.example.edutechlite.service.IncidentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {

    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @GetMapping
    public ResponseEntity<List<IncidentResponseDTO>> getAllIncidents(
            @RequestParam(required = false) boolean highSeverityOnly) {

        List<Incident> incidents;
        if (highSeverityOnly) {
            incidents = incidentService.getHighSeverityIncidents();
        } else {
            incidents = incidentService.getAllIncidents();
        }

        List<IncidentResponseDTO> responseDTOs = incidents.stream().map(incident -> {
            IncidentResponseDTO dto = new IncidentResponseDTO();
            dto.setId(incident.getId());
            dto.setStudentName(incident.getStudentName());
            dto.setSeverity(incident.getSeverity());
            dto.setDescription(incident.getDescription());
            dto.setCreatedAt(incident.getCreatedAt());
            dto.setStatus(incident.getStatus());

            if (incident.getReporter() != null) {
                dto.setReporterId(incident.getReporter().getId());
                dto.setReporterName(incident.getReporter().getUsername());
            }
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(responseDTOs);
    }

    @PostMapping
    public ResponseEntity<IncidentResponseDTO> createIncident(@RequestBody IncidentRequestDTO requestDTO) {
        Incident incident = new Incident();
        incident.setStudentName(requestDTO.getStudentName());
        incident.setSeverity(requestDTO.getSeverity());
        incident.setDescription(requestDTO.getDescription());

        Incident savedIncident = incidentService.createIncident(incident);

        IncidentResponseDTO dto = new IncidentResponseDTO();
        dto.setId(savedIncident.getId());
        dto.setStudentName(savedIncident.getStudentName());
        dto.setSeverity(savedIncident.getSeverity());
        dto.setDescription(savedIncident.getDescription());
        dto.setCreatedAt(savedIncident.getCreatedAt());
        dto.setStatus(savedIncident.getStatus());

        if (savedIncident.getReporter() != null) {
            dto.setReporterId(savedIncident.getReporter().getId());
            dto.setReporterName(savedIncident.getReporter().getUsername());
        }

        return ResponseEntity.ok(dto);
    }
}