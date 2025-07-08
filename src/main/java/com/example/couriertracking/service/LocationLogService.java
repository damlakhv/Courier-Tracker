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
import java.util.stream.Collectors;

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

    private Courier fetchCourier(Long id) {
        return courierRepository.findById(id)
                .orElseThrow(() -> new CourierNotFoundException(id));
    }
    private void persistLocationLog(AddLocationLogRequest req, Courier courier) {
        LocationLog log = new LocationLog(req.lat(), req.lng(), req.timestamp(), courier);
        locationLogRepository.save(log);
    }

    private List<LocationLog> fetchLogs(Long courierId, LocalDateTime start, LocalDateTime end) {
        return locationLogRepository.findByCourierIdAndTimestampBetween(courierId, start, end);
    }

    private void recordStoreVisits(Courier courier, List<Store> stores, AddLocationLogRequest req, Set<Long> skipIds) {
        stores.forEach(store -> {
            if (skipIds.contains(store.getId())) {
                LOGGER.info("Skipped duplicate visit for: {}", store.getName());
            } else {
                StoreVisitLog visit = new StoreVisitLog(courier, store, req.timestamp());
                storeVisitLogRepository.save(visit);
                LOGGER.info("StoreVisitLog added for: {}", store.getName());
            }
        });
    }

    private void logStores(List<Store> stores) {
        if (stores.isEmpty()) return;
        try {
            String json = OBJECT_MAPPER.writeValueAsString(stores);
            LOGGER.info("Nearby stores: {}", json);
        } catch (JsonProcessingException e) {
            throw new JsonConversionException("Failed to convert nearby stores to JSON", e);
        }
    }

    public void addLocationLog(AddLocationLogRequest request) {
        Courier courier = fetchCourier(request.courierId());
        persistLocationLog(request, courier);

        List<Store> nearbyStores = getNearbyStores(request.lat(), request.lng());
        logStores(nearbyStores);

        LocalDateTime oneMinuteAgo = request.timestamp().minusMinutes(1);
        List<Store> visitedStores = storeVisitLogRepository.findVisitedStoresAfter(courier, oneMinuteAgo, nearbyStores);

        Set<Long> visitedStoreIds = new HashSet<>();
        for (Store s : visitedStores) {
            visitedStoreIds.add(s.getId());
        }
        recordStoreVisits(courier, nearbyStores, request, visitedStoreIds);

    }

    public double getTotalDistanceBetweenTimes(Long courierId, LocalDateTime start, LocalDateTime end) {
        List<LocationLog> logs = fetchLogs(courierId, start, end);
        if (logs.size() < 2) return 0.0;

        double totalDistance = 0.0;
        for (int i = 1; i < logs.size(); i++) {
            LocationLog prev = logs.get(i - 1);
            LocationLog curr = logs.get(i);

            Double distance = storeRepository.calculateDistance(prev.getLat(), prev.getLng(), curr.getLat(), curr.getLng());

            if (distance != null) {
                totalDistance += distance;
            }
        }
        return totalDistance / 1000.0;
    }

    public List<LocationLogDto> fetchLogsByRange(Long courierId, LocalDateTime start, LocalDateTime end) {
        return fetchLogs(courierId, start, end).stream()
                .map(log -> new LocationLogDto(log.getLat(), log.getLng(), log.getTimestamp()))
                .collect(Collectors.toList());
    }

}
