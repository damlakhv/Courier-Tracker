package com.example.couriertracking.controller;

import com.example.couriertracking.model.AddLocationLogRequest;
import com.example.couriertracking.service.LocationLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/location-logs")
public class LocationLogController {

    @Autowired
    private LocationLogService locationLogService;

    @PostMapping
    public ResponseEntity<Void> addLocationLog(@RequestBody AddLocationLogRequest request) {
        locationLogService.addLocationLog(request);
        return ResponseEntity.ok().build();
    }
}
