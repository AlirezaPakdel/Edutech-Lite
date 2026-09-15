package org.example.edutechlite.dto;

import org.example.edutechlite.entity.SeverityLevel;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class IncidentResponseDTO {
    private Long id;
    private String studentName;
    private SeverityLevel severity;
    private String description;
    private LocalDateTime createdAt;
    private String status;
    private Long reporterId;
    private String reporterName;
}