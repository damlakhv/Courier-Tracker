package com.example.couriertracking.service;

import com.example.couriertracking.model.*;
import com.example.couriertracking.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationLogService {

    @Autowired
    private LocationLogRepository locationLogRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private CourierRepository courierRepository;

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
        var stores = getNearbyStores(request.lat(), request.lng());

        ObjectMapper objectMapper = new ObjectMapper();
        if(!stores.isEmpty()) {
            String jsonStores = objectMapper.writeValueAsString(stores);
            System.out.println("Nearby stores: " + jsonStores);
        }
    }

    public List<Store> getNearbyStores (Double lat, Double lng){
        return storeRepository.findNearbyStores(lat, lng);
    }

    public void logDistancesForStores(double courierLat, double courierLng) {
        List<Store> stores = storeRepository.findAll();
        for (Store store : stores) {
            Double distance = storeRepository.calculateDistance(
                    courierLat, courierLng,
                    store.getLat(), store.getLng()
            );
            System.out.println(store.getName() + " → " + String.format("%.2f", distance) + " meters");
        }
    }

    public static double haversine(double lat1, double lng1, double lat2, double lng2) {
        final int R = 6371000;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    public void handleNewLocation(Double courierLat, Double courierLng) {
        List<Store> allStores = storeRepository.findAll();
        for (Store store : allStores) {
            double distance = haversine(courierLat, courierLng, store.getLat(), store.getLng());
            if (distance < 100) {
                System.out.println("Courier is within 100m of " + store.getName() + " (" + distance + "m)");
            } else {
                System.out.println("Courier is NOT within 100m of " + store.getName() + " (" + distance + "m)");
            }
        }
    }






}
