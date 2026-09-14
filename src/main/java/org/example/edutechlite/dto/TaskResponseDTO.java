package org.example.edutechlite.dto;

import org.example.edutechlite.entity.TaskStatus;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class TaskResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String department;
    private LocalDate deadline;
    private TaskStatus status;
    private Long assigneeId;
    private String assigneeName;
}
