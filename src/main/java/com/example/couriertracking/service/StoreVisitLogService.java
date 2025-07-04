
package com.example.couriertracking.service;

import com.example.couriertracking.model.*;
import com.example.couriertracking.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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
                .orElseThrow(() -> new IllegalArgumentException("Courier not found"));
        Store store = storeRepository.findById(request.storeId())
                .orElseThrow(() -> new IllegalArgumentException("Store not found"));

        StoreVisitLog log = new StoreVisitLog(courier, store, LocalDateTime.now());
        storeVisitLogRepository.save(log);
    }
}
