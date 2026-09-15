package org.example.edutechlite.controller;

import org.example.edutechlite.dto.DashboardStatsResponseDTO;
import org.example.edutechlite.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponseDTO> getDashboardStats() {
        return ResponseEntity.ok(dashboardService.getStats());
    }
}