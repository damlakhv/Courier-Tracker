package com.example.couriertracking.controller;

import com.example.couriertracking.model.AddStoreVisitLogRequest;
import com.example.couriertracking.service.StoreVisitLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/store-visits")
public class StoreVisitLogController {

    @Autowired
    private StoreVisitLogService storeVisitLogService;

    @PostMapping
    public ResponseEntity<Void> addStoreVisit(@RequestBody AddStoreVisitLogRequest request) {
        storeVisitLogService.addStoreVisitLog(request);
        return ResponseEntity.ok().build();
    }
}
