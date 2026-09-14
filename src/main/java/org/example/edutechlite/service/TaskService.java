package org.example.edutechlite.service;

import org.example.edutechlite.entity.Task;
import org.example.edutechlite.entity.TaskStatus;
import org.example.edutechlite.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // متد دریافت همه وظایف برای نمایش در بورد کانبان فرانت‌اند
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // متد ایجاد وظیفه جدید با وضعیت پیش‌فرض TODO
    public Task createTask(Task task) {
        task.setStatus(TaskStatus.TODO);
        return taskRepository.save(task);
    }

    // متد تغییر وضعیت (برای وقتی که کاربر کارت را در بورد کانبان جابه‌جا می‌کند)
    public Task updateTaskStatus(Long id, TaskStatus newStatus) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("تسک با این شناسه پیدا نشد: " + id));

        task.setStatus(newStatus);
        return taskRepository.save(task);
    }

    // متد حذف وظیفه از بورد
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("تسک مورد نظر برای حذف پیدا نشد: " + id);
        }
        taskRepository.deleteById(id);
    }
}