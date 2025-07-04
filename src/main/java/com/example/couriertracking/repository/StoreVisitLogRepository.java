package com.example.couriertracking.repository;

import com.example.couriertracking.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface StoreVisitLogRepository extends JpaRepository<StoreVisitLog, Long> {
    Optional<StoreVisitLog> findTopByCourierAndStoreOrderByEntryTimeDesc(Courier courier, Store store);
    long countByCourierAndStoreAndEntryTimeAfter(Courier courier, Store store, LocalDateTime after);
}
