package com.example.couriertracking.controller;

import com.example.couriertracking.model.AddStoreVisitLogRequest;
import com.example.couriertracking.model.StoreVisitLog;
import com.example.couriertracking.service.StoreVisitLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/store-visits")
public class StoreVisitLogController {

    private final StoreVisitLogService storeVisitLogService;

    public StoreVisitLogController (StoreVisitLogService storeVisitLogService) {
        this.storeVisitLogService = storeVisitLogService;
    }

    @PostMapping
    public ResponseEntity<Void> addStoreVisit(@RequestBody AddStoreVisitLogRequest request) {
        storeVisitLogService.addStoreVisitLog(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<StoreVisitLog>> getAllStoreVisits() {
        List<StoreVisitLog> logs = storeVisitLogService.getAllStoreVisitLogs();
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<StoreVisitLog>> getVisitsByStore(@PathVariable Long storeId) {
        List<StoreVisitLog> logs = storeVisitLogService.getStoreVisitLogsByStoreId(storeId);
        return ResponseEntity.ok(logs);
    }


}
