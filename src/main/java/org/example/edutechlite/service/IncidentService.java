package org.example.edutechlite.service;

import org.example.edutechlite.entity.Incident;
import org.example.edutechlite.entity.SeverityLevel;
import org.example.edutechlite.repository.IncidentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    // ثبت گزارش جدید انضباطی یا حادثه
    public Incident createIncident(Incident incident) {
        incident.setCreatedAt(LocalDateTime.now());
        if (incident.getStatus() == null) {
            incident.setStatus("PENDING"); // وضعیت پیش‌فرض برای بررسی
        }
        return incidentRepository.save(incident);
    }

    // دریافت لیست کامل گزارش‌ها برای مدیر یا ناظم
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    // فیلتر حوادث بحرانی (سطح HIGH) جهت نمایش هشدار فوری در داشبورد
    public List<Incident> getHighSeverityIncidents() {
        return incidentRepository.findBySeverity(SeverityLevel.HIGH);
    }
}