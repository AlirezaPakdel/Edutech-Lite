package org.example.edutechlite.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.DayOfWeek;

@Getter
@Setter
public class ScheduleResponseDTO {
    private Long id;
    private String className;
    private DayOfWeek dayOfWeek;
    private int timeSlot;
    private String subject;
    private boolean isSubstitute;
    private Long teacherId;
    private String teacherName;
}