package org.example.edutechlite.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.DayOfWeek;

@Entity
@Table(name = "schedules")
@Getter
@Setter
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String className;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DayOfWeek dayOfWeek;

    @Column(nullable = false)
    private int timeSlot;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private boolean isSubstitute;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private User teacher;
}