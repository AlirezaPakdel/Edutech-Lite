package org.example.edutechlite.controller;

import org.example.edutechlite.dto.ScheduleResponseDTO;
import org.example.edutechlite.dto.SubstituteRequestDTO;
import org.example.edutechlite.entity.Schedule;
import org.example.edutechlite.service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("/class/{className}")
    public ResponseEntity<List<ScheduleResponseDTO>> getScheduleByClass(
            @PathVariable String className,
            @RequestParam(required = false) DayOfWeek dayOfWeek) {

        List<Schedule> schedules = scheduleService.getScheduleByClass(className, dayOfWeek);
        List<ScheduleResponseDTO> responseDTOs = schedules.stream().map(this::mapToResponseDTO).collect(Collectors.toList());

        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<ScheduleResponseDTO>> getScheduleByTeacher(@PathVariable Long teacherId) {
        List<Schedule> schedules = scheduleService.getScheduleByTeacher(teacherId);
        List<ScheduleResponseDTO> responseDTOs = schedules.stream().map(this::mapToResponseDTO).collect(Collectors.toList());

        return ResponseEntity.ok(responseDTOs);
    }

    @PostMapping("/substitute")
    public ResponseEntity<ScheduleResponseDTO> assignSubstituteTeacher(@RequestBody SubstituteRequestDTO requestDTO) {
        Schedule updatedSchedule = scheduleService.assignSubstituteTeacher(
                requestDTO.getScheduleId(),
                requestDTO.getNewTeacherId()
        );

        return ResponseEntity.ok(mapToResponseDTO(updatedSchedule));
    }

    private ScheduleResponseDTO mapToResponseDTO(Schedule schedule) {
        ScheduleResponseDTO dto = new ScheduleResponseDTO();
        dto.setId(schedule.getId());
        dto.setClassName(schedule.getClassName());
        dto.setDayOfWeek(schedule.getDayOfWeek());
        dto.setTimeSlot(schedule.getTimeSlot());
        dto.setSubject(schedule.getSubject());
        dto.setSubstitute(schedule.isSubstitute());

        if (schedule.getTeacher() != null) {
            dto.setTeacherId(schedule.getTeacher().getId());
            dto.setTeacherName(schedule.getTeacher().getUsername());
        }

        return dto;
    }
}