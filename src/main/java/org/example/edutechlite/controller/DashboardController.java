package org.example.edutechlite.controller;

import org.example.edutechlite.dto.DashboardStatsResponseDTO;
import org.example.edutechlite.entity.TaskStatus;
import org.example.edutechlite.repository.IncidentRepository;
import org.example.edutechlite.repository.ScheduleRepository;
import org.example.edutechlite.repository.TaskRepository;
import org.example.edutechlite.entity.SeverityLevel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final TaskRepository taskRepository;
    private final ScheduleRepository scheduleRepository;
    private final IncidentRepository incidentRepository;

    public DashboardController(TaskRepository taskRepository,
                               ScheduleRepository scheduleRepository,
                               IncidentRepository incidentRepository) {
        this.taskRepository = taskRepository;
        this.scheduleRepository = scheduleRepository;
        this.incidentRepository = incidentRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponseDTO> getDashboardStats() {
        long unfinishedTasksCount = taskRepository.findAll().stream()
                .filter(task -> task.getStatus() != TaskStatus.DONE)
                .count();

        long substituteSchedulesCount = scheduleRepository.findAll().stream()
                .filter(schedule -> schedule.isSubstitute())
                .count();

        long highSeverityIncidentsCount = incidentRepository.findBySeverity(SeverityLevel.HIGH).size();

        DashboardStatsResponseDTO stats = new DashboardStatsResponseDTO(
                unfinishedTasksCount,
                substituteSchedulesCount,
                highSeverityIncidentsCount
        );

        return ResponseEntity.ok(stats);
    }
}