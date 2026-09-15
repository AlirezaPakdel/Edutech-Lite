package org.example.edutechlite.service;

import org.example.edutechlite.dto.DashboardStatsResponseDTO;
import org.example.edutechlite.entity.SeverityLevel;
import org.example.edutechlite.entity.TaskStatus;
import org.example.edutechlite.repository.IncidentRepository;
import org.example.edutechlite.repository.ScheduleRepository;
import org.example.edutechlite.repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final TaskRepository taskRepository;
    private final ScheduleRepository scheduleRepository;
    private final IncidentRepository incidentRepository;

    public DashboardService(TaskRepository taskRepository,
                            ScheduleRepository scheduleRepository,
                            IncidentRepository incidentRepository) {
        this.taskRepository = taskRepository;
        this.scheduleRepository = scheduleRepository;
        this.incidentRepository = incidentRepository;
    }

    public DashboardStatsResponseDTO getStats() {
        long unfinished = taskRepository.countByStatusNot(TaskStatus.DONE);
        long substitutes = scheduleRepository.countByIsSubstituteTrue();
        long highSeverity = incidentRepository.countBySeverity(SeverityLevel.HIGH);

        return new DashboardStatsResponseDTO(unfinished, substitutes, highSeverity);
    }
}