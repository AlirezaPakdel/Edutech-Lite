package org.example.edutechlite.repository;

import org.example.edutechlite.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
