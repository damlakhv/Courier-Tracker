package com.example.couriertracking.controller;

import com.example.couriertracking.model.AddLocationLogRequest;
import com.example.couriertracking.service.LocationLogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/location-logs")
public class LocationLogController {

    private final LocationLogService locationLogService;

    public LocationLogController (LocationLogService locationLogService) {
        this.locationLogService = locationLogService;
    }

    @PostMapping
    public ResponseEntity<Void> addLocationLog(@RequestBody AddLocationLogRequest request) throws JsonProcessingException {
        locationLogService.addLocationLog(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/total-distance")
    public ResponseEntity<Double> getTotalDistance(
            @RequestParam Long courierId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {

        double distance = locationLogService.getTotalDistanceBetweenTimes(courierId, start, end);
        return ResponseEntity.ok(distance);
    }

}
