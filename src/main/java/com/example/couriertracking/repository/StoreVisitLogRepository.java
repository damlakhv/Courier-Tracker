package com.example.couriertracking.repository;

import com.example.couriertracking.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface StoreVisitLogRepository extends JpaRepository<StoreVisitLog, Long> {
    long countByCourierAndStoreAndEntryTimeAfter(Courier courier, Store store, LocalDateTime after);
}
