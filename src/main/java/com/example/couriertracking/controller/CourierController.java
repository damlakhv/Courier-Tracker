package com.example.couriertracking.controller;

import com.example.couriertracking.model.AddCourierRequest;
import com.example.couriertracking.model.Courier;
import com.example.couriertracking.service.CourierService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Validated
@RestController
@RequestMapping("/api/couriers")
public class CourierController {

    private final CourierService courierService;

    public CourierController(CourierService courierService) {
        this.courierService = courierService;
    }
    @GetMapping
    public ResponseEntity<List<Courier>> getAllCouriers() {
        List<Courier> all = courierService.getAllCouriers();
        return ResponseEntity.ok(all);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Courier> getCourier(@PathVariable Long id) {
        return ResponseEntity.ok(courierService.getCourier(id));
    }

    @PostMapping
    public ResponseEntity<Courier> addCourier(@Validated @RequestBody AddCourierRequest courier) {
        Courier saved = courierService.addCourier(courier);
        return ResponseEntity.ok(saved);
    }


}
