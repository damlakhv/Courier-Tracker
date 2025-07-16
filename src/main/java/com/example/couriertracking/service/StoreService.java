package com.example.couriertracking.service;


import com.example.couriertracking.exception.StoreNotFoundException;
import com.example.couriertracking.model.AddStoresRequest;
import com.example.couriertracking.model.Store;
import com.example.couriertracking.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class StoreService {

    private final StoreRepository storeRepository;

    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    public List<Store> addStores(AddStoresRequest request) {
        List<Store> stores = request.storeInfos().stream()
                .map(storeInfo -> new Store(storeInfo.name(),storeInfo.lat(),storeInfo.lng()))
                .toList();

       return storeRepository.saveAll(stores);
    }
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    public Store updateStore(Long id, AddStoresRequest.StoreInfo info) {
        Store s = storeRepository.findById(id)
                .orElseThrow(() -> new StoreNotFoundException(id));
        s.setName(info.name());
        s.setLat(info.lat());
        s.setLng(info.lng());
        return storeRepository.save(s);
    }

    public void deleteStore(Long id) {
        if (!storeRepository.existsById(id)) {
            throw new StoreNotFoundException(id);
        }
        storeRepository.deleteById(id);
    }


}

