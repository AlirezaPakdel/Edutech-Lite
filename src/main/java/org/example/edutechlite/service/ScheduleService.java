package org.example.edutechlite.service;

import org.example.edutechlite.entity.Schedule;
import org.example.edutechlite.entity.User;
import org.example.edutechlite.repository.ScheduleRepository;
import org.example.edutechlite.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    public ScheduleService(ScheduleRepository scheduleRepository, UserRepository userRepository) {
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
    }

    // دریافت برنامه کلاس بر اساس نام کلاس و روز هفته (یا فقط نام کلاس)
    public List<Schedule> getScheduleByClass(String className, DayOfWeek dayOfWeek) {
        if (dayOfWeek != null) {
            return scheduleRepository.findByClassNameAndDayOfWeek(className, dayOfWeek);
        }
        return scheduleRepository.findByClassName(className);
    }

    // دریافت برنامه درسی یک معلم خاص
    public List<Schedule> getScheduleByTeacher(Long teacherId) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("معلم مورد نظر پیدا نشد: " + teacherId));
        return scheduleRepository.findByTeacher(teacher);
    }

    // تخصیص معلم جانشین در صورت غیبت
    public Schedule assignSubstituteTeacher(Long scheduleId, Long substituteTeacherId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("زنگ برنامه مورد نظر پیدا نشد: " + scheduleId));

        User substituteTeacher = userRepository.findById(substituteTeacherId)
                .orElseThrow(() -> new RuntimeException("معلم جانشین پیدا نشد: " + substituteTeacherId));

        schedule.setTeacher(substituteTeacher);
        schedule.setSubstitute(true);

        return scheduleRepository.save(schedule);
    }
}