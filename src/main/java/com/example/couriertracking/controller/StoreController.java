package com.example.couriertracking.controller;

import com.example.couriertracking.model.AddStoresRequest;
import com.example.couriertracking.model.Store;
import com.example.couriertracking.service.StoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/stores")
public class StoreController {

    private final StoreService storeService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @PostMapping
    public ResponseEntity<List<Store>> addStores(@Validated @RequestBody AddStoresRequest request) {
        return ResponseEntity.ok(storeService.addStores(request));
    }

    @GetMapping
    public ResponseEntity<List<Store>> getAllStores() {
        List<Store> stores = storeService.getAllStores();
        return ResponseEntity.ok(stores);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Store> updateStore(
            @PathVariable Long id,
            @Validated @RequestBody AddStoresRequest.StoreInfo info
    ) {
        Store updated = storeService.updateStore(id, info);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long id) {
        storeService.deleteStore(id);
        return ResponseEntity.noContent().build();
    }

}
