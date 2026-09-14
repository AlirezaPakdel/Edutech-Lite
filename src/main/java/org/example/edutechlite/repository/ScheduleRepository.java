package org.example.edutechlite.repository;

import org.example.edutechlite.entity.Schedule;
import org.example.edutechlite.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByClassName(String className);
    List<Schedule> findByClassNameAndDayOfWeek(String className, DayOfWeek dayOfWeek);
    List<Schedule> findByTeacher(User teacher);
}
