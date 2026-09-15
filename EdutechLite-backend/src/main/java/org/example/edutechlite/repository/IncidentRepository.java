package org.example.edutechlite.repository;

import org.example.edutechlite.entity.Incident;
import org.example.edutechlite.entity.SeverityLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findBySeverity(SeverityLevel severity);
    long countBySeverity(SeverityLevel severity);
}
