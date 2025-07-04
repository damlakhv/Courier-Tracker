package com.example.couriertracking.repository;

import com.example.couriertracking.model.LocationLog;
import com.example.couriertracking.model.Courier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationLogRepository extends JpaRepository<LocationLog, Long> {
    List<LocationLog> findByCourierOrderByTimestampAsc(Courier courier);
}
