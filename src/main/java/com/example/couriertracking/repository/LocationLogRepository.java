package com.example.couriertracking.repository;

import com.example.couriertracking.model.LocationLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface LocationLogRepository extends JpaRepository<LocationLog, Long> {
    List<LocationLog> findByCourierIdAndTimestampBetween(Long courierId, LocalDateTime start, LocalDateTime end);
}
