package org.example.edutechlite.dto;

import org.example.edutechlite.entity.TaskStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskStatusUpdateDTO {
    private TaskStatus status;
}
