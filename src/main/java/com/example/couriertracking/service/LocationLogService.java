package com.example.couriertracking.service;

import com.example.couriertracking.model.*;
import com.example.couriertracking.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LocationLogService {

    @Autowired
    private LocationLogRepository locationLogRepository;

    @Autowired
    private StoreVisitLogRepository storeVisitLogRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private CourierRepository courierRepository;

    public List<Store> getNearbyStores (Double lat, Double lng){
        return storeRepository.findNearbyStores(lat, lng);
    }

    public void addLocationLog(AddLocationLogRequest request) throws JsonProcessingException {
        Courier courier = courierRepository.findById(request.courierId())
                .orElseThrow(() -> new IllegalArgumentException("Courier not found"));

        LocationLog log = new LocationLog(
                request.lat(),
                request.lng(),
                request.timestamp(),
                courier
        );
        locationLogRepository.save(log);

        List<Store> nearbyStores = getNearbyStores(request.lat(), request.lng());

        if (!nearbyStores.isEmpty()) {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonStores = objectMapper.writeValueAsString(nearbyStores);
            System.out.println("Nearby stores: " + jsonStores);
        }

        LocalDateTime oneMinuteAgo = request.timestamp().minusMinutes(1);

        for (Store nearbyStore : nearbyStores) {
            long recentCount = storeVisitLogRepository.countByCourierAndStoreAndEntryTimeAfter(courier, nearbyStore, oneMinuteAgo);

            if (recentCount == 0) {
                StoreVisitLog visitLog = new StoreVisitLog(courier, nearbyStore, request.timestamp());
                storeVisitLogRepository.save(visitLog);
                System.out.println(" StoreVisitLog added for: " + nearbyStore.getName());
            } else {
                System.out.println(" Skipped duplicate visit for: " + nearbyStore.getName());
            }
        }
    }


}
