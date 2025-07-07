package com.example.couriertracking.controller;

import com.example.couriertracking.model.AddLocationLogRequest;
import com.example.couriertracking.service.LocationLogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
