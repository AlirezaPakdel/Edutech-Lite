package org.example.edutechlite.dto;

import org.example.edutechlite.entity.SeverityLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IncidentRequestDTO {
    private String studentName;
    private SeverityLevel severity;
    private String description;
}