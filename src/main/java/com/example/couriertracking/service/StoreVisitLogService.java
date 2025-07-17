
package com.example.couriertracking.service;

import com.example.couriertracking.exception.CourierNotFoundException;
import com.example.couriertracking.exception.StoreNotFoundException;
import com.example.couriertracking.model.*;
import com.example.couriertracking.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoreVisitLogService {

    @Autowired
    private CourierRepository courierRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private StoreVisitLogRepository storeVisitLogRepository;

    public void addStoreVisitLog(AddStoreVisitLogRequest request) {
        Courier courier = courierRepository.findById(request.courierId())
                .orElseThrow(() -> new CourierNotFoundException(request.courierId()));
        Store store = storeRepository.findById(request.storeId())
                .orElseThrow(() -> new StoreNotFoundException(request.storeId()));

        StoreVisitLog log = new StoreVisitLog(courier, store, LocalDateTime.now());
        storeVisitLogRepository.save(log);
    }

    public List<StoreVisitLog> getAllStoreVisitLogs() {
        return storeVisitLogRepository.findAllOrderByEntryTimeDesc();
    }

    public List<StoreVisitLog> getStoreVisitLogsByStoreId(Long storeId) {
        return storeVisitLogRepository.findByStoreIdOrderByEntryTimeDesc(storeId);
    }

    public long countVisitsToday() {
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();
        return storeVisitLogRepository.countByEntryTimeBetween(start, end);
    }
}
