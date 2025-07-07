package com.example.couriertracking.service;

import com.example.couriertracking.exception.CourierNotFoundException;
import com.example.couriertracking.exception.JsonConversionException;
import com.example.couriertracking.model.*;
import com.example.couriertracking.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;

@Service
public class LocationLogService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LocationLogService.class);

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

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
                .orElseThrow(() -> new CourierNotFoundException(request.courierId()));

        LocationLog log = new LocationLog(
                request.lat(),
                request.lng(),
                request.timestamp(),
                courier
        );
        locationLogRepository.save(log);

        List<Store> nearbyStores = getNearbyStores(request.lat(), request.lng());

        if (!nearbyStores.isEmpty()) {
            try {
                String jsonStores = OBJECT_MAPPER.writeValueAsString(nearbyStores);
                LOGGER.info("Nearby stores: {}", jsonStores);
            } catch (JsonProcessingException e) {
                throw new JsonConversionException("Failed to convert nearbyStores to JSON", e);
            }
        }

        LocalDateTime oneMinuteAgo = request.timestamp().minusMinutes(1);
        List<Store> visitedStores = storeVisitLogRepository.findVisitedStoresAfter(courier, oneMinuteAgo, nearbyStores);

        Set<Long> visitedStoreIds = new HashSet<>();
        for (Store s : visitedStores) {
            visitedStoreIds.add(s.getId());
        }

        for (Store nearbyStore : nearbyStores) {
            if (!visitedStoreIds.contains(nearbyStore.getId())) {
                StoreVisitLog visitLog = new StoreVisitLog(courier, nearbyStore, request.timestamp());
                storeVisitLogRepository.save(visitLog);
                LOGGER.info("StoreVisitLog added for: {}", nearbyStore.getName());
            } else {
                LOGGER.info("Skipped duplicate visit for: {}", nearbyStore.getName());
            }
        }
    }

    public double getTotalDistanceBetweenTimes(Long courierId, LocalDateTime start, LocalDateTime end) {
        List<LocationLog> logs = locationLogRepository.findByCourierIdAndTimestampBetweenOrderByTimestampAsc(courierId, start, end);

        if (logs.size() < 2) return 0.0;

        double totalDistance = 0.0;
        for (int i = 1; i < logs.size(); i++) {
            LocationLog prev = logs.get(i - 1);
            LocationLog curr = logs.get(i);

            Double distance = storeRepository.calculateDistance(
                    prev.getLat(), prev.getLng(), curr.getLat(), curr.getLng()
            );

            if (distance != null) {
                totalDistance += distance;
            }
        }
        return totalDistance / 1000.0;
    }



}
