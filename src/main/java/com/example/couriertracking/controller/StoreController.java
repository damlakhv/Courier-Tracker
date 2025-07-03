package com.example.couriertracking.controller;

import com.example.couriertracking.model.AddStoreRequest;
import com.example.couriertracking.model.AddStoresRequest;
import com.example.couriertracking.model.Store;
import com.example.couriertracking.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/stores")
public class StoreController {

    private final StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    {
//        @PostMapping
//        public ResponseEntity<Store> addStore (@Validated @RequestBody AddStoreRequest store){
//        Store saved = storeService.addStore(store);
//        return ResponseEntity.ok(saved);
//    }
    }

    @PostMapping
    public ResponseEntity<List<Store>> addStores(@Validated @RequestBody AddStoresRequest request) {
        return ResponseEntity.ok(storeService.addStores(request));
    }



}
