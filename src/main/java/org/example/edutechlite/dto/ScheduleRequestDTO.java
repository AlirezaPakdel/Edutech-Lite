package org.example.edutechlite.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.DayOfWeek;

@Getter
@Setter
public class ScheduleRequestDTO {
    private String className;
    private DayOfWeek dayOfWeek;
    private int timeSlot;
    private Long teacherId;
    private String subject;
}
