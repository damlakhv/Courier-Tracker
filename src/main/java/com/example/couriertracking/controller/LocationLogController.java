package com.example.couriertracking.controller;

import com.example.couriertracking.model.AddLocationLogRequest;
import com.example.couriertracking.service.LocationLogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/location-logs")
public class LocationLogController {

    @Autowired
    private LocationLogService locationLogService;

    @PostMapping
    public ResponseEntity<Void> addLocationLog(@RequestBody AddLocationLogRequest request) throws JsonProcessingException {
        locationLogService.addLocationLog(request);
        locationLogService.logDistancesForStores(request.lat(), request.lng());
        locationLogService.handleNewLocation(request.lat(), request.lng());

        return ResponseEntity.ok().build();
    }

}
