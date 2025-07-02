package com.example.couriertracking.controller;

import com.example.couriertracking.model.AddCourierRequest;
import com.example.couriertracking.model.Courier;
import com.example.couriertracking.service.CourierService;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/api/couriers")
public class CourierTrackingController {

    private final CourierService courierService;

    @Autowired
    public CourierTrackingController(CourierService courierService) {
        this.courierService = courierService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Courier> getCourier(@PathVariable @Positive Long id) {
        Courier courier = courierService.getCourier(id);
        return ResponseEntity.ok(courier);
    }

    @PostMapping
    public ResponseEntity<Courier> addCourier(@Validated @RequestBody AddCourierRequest courier) {
        Courier saved = courierService.addCourier(courier);
        return ResponseEntity.ok(saved);
    }
}
