package com.example.couriertracking.service;


import com.example.couriertracking.model.AddStoresRequest;
import com.example.couriertracking.model.Store;
import com.example.couriertracking.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class StoreService {

    private final StoreRepository storeRepository;

    @Autowired
    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

//    public Store addStore(AddStoreRequest request) {
//        var store= new Store(request.name(),request.lat(),request.lng());
//        return storeRepository.save(store);
//    }

    public List<Store> addStores(AddStoresRequest request) {
        List<Store> stores = request.storeInfos().stream()
                .map(storeInfo -> new Store(storeInfo.name(),storeInfo.lat(),storeInfo.lng()))
                .toList();

       return storeRepository.saveAll(stores);
    }

}

