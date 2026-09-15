package org.example.edutechlite.controller;

import org.example.edutechlite.dto.TaskRequestDTO;
import org.example.edutechlite.dto.TaskResponseDTO;
import org.example.edutechlite.dto.TaskStatusUpdateDTO;
import org.example.edutechlite.entity.Task;
import org.example.edutechlite.entity.User;
import org.example.edutechlite.service.TaskService;
import org.example.edutechlite.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks() {
        List<TaskResponseDTO> responseDTOs = taskService.getAllTasks().stream().map(task -> {
            TaskResponseDTO dto = new TaskResponseDTO();
            dto.setId(task.getId());
            dto.setTitle(task.getTitle());
            dto.setDescription(task.getDescription());
            dto.setDepartment(task.getDepartment());
            dto.setDeadline(task.getDeadline());
            dto.setStatus(task.getStatus());
            if (task.getAssignee() != null) {
                dto.setAssigneeId(task.getAssignee().getId());
                dto.setAssigneeName(task.getAssignee().getUsername());
            }
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(responseDTOs);
    }

    @PostMapping
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskRequestDTO requestDTO) {
        Task task = new Task();
        task.setTitle(requestDTO.getTitle());
        task.setDescription(requestDTO.getDescription());
        task.setDepartment(requestDTO.getDepartment());
        task.setDeadline(requestDTO.getDeadline());

        if (requestDTO.getAssigneeId() != null) {
            User assignee = userService.findByUsername(requestDTO.getAssigneeId().toString());
            task.setAssignee(assignee);
        }

        Task savedTask = taskService.createTask(task);

        TaskResponseDTO dto = new TaskResponseDTO();
        dto.setId(savedTask.getId());
        dto.setTitle(savedTask.getTitle());
        dto.setDescription(savedTask.getDescription());
        dto.setDepartment(savedTask.getDepartment());
        dto.setDeadline(savedTask.getDeadline());
        dto.setStatus(savedTask.getStatus());
        if (savedTask.getAssignee() != null) {
            dto.setAssigneeId(savedTask.getAssignee().getId());
            dto.setAssigneeName(savedTask.getAssignee().getUsername());
        }

        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<TaskResponseDTO> updateTaskStatus(
            @PathVariable Long id,
            @RequestBody TaskStatusUpdateDTO statusUpdateDTO) {

        Task updatedTask = taskService.updateTaskStatus(id, statusUpdateDTO.getStatus());

        TaskResponseDTO dto = new TaskResponseDTO();
        dto.setId(updatedTask.getId());
        dto.setTitle(updatedTask.getTitle());
        dto.setDescription(updatedTask.getDescription());
        dto.setDepartment(updatedTask.getDepartment());
        dto.setDeadline(updatedTask.getDeadline());
        dto.setStatus(updatedTask.getStatus());
        if (updatedTask.getAssignee() != null) {
            dto.setAssigneeId(updatedTask.getAssignee().getId());
            dto.setAssigneeName(updatedTask.getAssignee().getUsername());
        }

        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}