package com.example.couriertracking.service;

import com.example.couriertracking.model.*;
import com.example.couriertracking.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LocationLogService {

    @Autowired
    private LocationLogRepository locationLogRepository;

    @Autowired
    private CourierRepository courierRepository;

    public void addLocationLog(AddLocationLogRequest request) {
        Courier courier = courierRepository.findById(request.courierId())
                .orElseThrow(() -> new IllegalArgumentException("Courier not found"));

        LocationLog log = new LocationLog(
                request.lat(),
                request.lng(),
                request.timestamp(),
                courier
        );

        locationLogRepository.save(log);


    }
}
