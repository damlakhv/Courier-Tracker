package com.example.couriertracking.repository;

import com.example.couriertracking.model.LocationLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationLogRepository extends JpaRepository<LocationLog, Long> {
}
