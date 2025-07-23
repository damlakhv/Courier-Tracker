package com.example.couriertracking.repository;

import com.example.couriertracking.model.Courier;
import com.example.couriertracking.model.Store;
import com.example.couriertracking.model.StoreVisitLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface StoreVisitLogRepository extends JpaRepository<StoreVisitLog, Long> {

    @Query("SELECT s.store FROM StoreVisitLog s " +
            "WHERE s.courier = :courier AND s.entryTime > :afterTime AND s.store IN :stores")
    List<Store> findVisitedStoresAfter(
            @Param("courier") Courier courier,
            @Param("afterTime") LocalDateTime afterTime,
            @Param("stores") List<Store> stores
    );

    @Query("SELECT l FROM StoreVisitLog l ORDER BY l.entryTime DESC")
    List<StoreVisitLog> findAllOrderByEntryTimeDesc();

    @Query("SELECT l FROM StoreVisitLog l WHERE l.store.id = :storeId ORDER BY l.entryTime DESC")
    List<StoreVisitLog> findByStoreIdOrderByEntryTimeDesc(@Param("storeId") Long storeId);

    @Query("""
      SELECT svl.courier.name, COUNT(svl)
      FROM StoreVisitLog svl
      WHERE svl.entryTime BETWEEN :start AND :end
      GROUP BY svl.courier.name
      ORDER BY COUNT(svl) DESC
      """)
    List<Object[]> findCourierVisitCounts(
            @Param("start") LocalDateTime start,
            @Param("end")   LocalDateTime end
    );

    @Query("""
      SELECT DISTINCT svl.store.name
      FROM StoreVisitLog svl
      WHERE svl.courier.name = :courierName
        AND svl.entryTime BETWEEN :start AND :end
      """)
    List<String> findDistinctStoreNamesByCourierBetween(
            @Param("courierName") String courierName,
            @Param("start")       LocalDateTime start,
            @Param("end")         LocalDateTime end
    );

    long countByEntryTimeBetween(LocalDateTime start, LocalDateTime end);

}