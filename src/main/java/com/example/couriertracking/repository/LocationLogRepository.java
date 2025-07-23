package com.example.couriertracking.repository;

import com.example.couriertracking.model.LocationLog;
import com.example.couriertracking.model.CourierLastLocationDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface LocationLogRepository extends JpaRepository<LocationLog, Long> {
    List<LocationLog> findByCourierIdAndTimestampBetween(Long courierId, LocalDateTime start, LocalDateTime end);

    @Query("""
      SELECT new com.example.couriertracking.model.CourierLastLocationDTO(
        l.courier.id,
        l.lat,
        l.lng)
      FROM LocationLog l
      WHERE l.timestamp = (
        SELECT MAX(l2.timestamp)
        FROM LocationLog l2
        WHERE l2.courier.id = l.courier.id
      )
    """)
    List<CourierLastLocationDTO> findAllCouriersLastLocations();

}



