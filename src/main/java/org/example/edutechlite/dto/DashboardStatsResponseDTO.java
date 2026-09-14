package org.example.edutechlite.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DashboardStatsResponseDTO {
    private long unfinishedTasksCount;
    private long substituteSchedulesCount;
    private long highSeverityIncidentsCount;
}