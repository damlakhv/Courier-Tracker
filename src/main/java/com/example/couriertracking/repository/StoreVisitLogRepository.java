package com.example.couriertracking.repository;

import com.example.couriertracking.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface StoreVisitLogRepository extends JpaRepository<StoreVisitLog, Long> {

    @Query("SELECT s.store FROM StoreVisitLog s " +
            "WHERE s.courier = :courier AND s.entryTime > :afterTime AND s.store IN :stores")
    List<Store> findVisitedStoresAfter(@Param("courier") Courier courier,
                                       @Param("afterTime") LocalDateTime afterTime,
                                       @Param("stores") List<Store> stores);

}
