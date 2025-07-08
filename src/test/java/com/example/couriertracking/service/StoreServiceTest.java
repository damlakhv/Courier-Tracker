package com.example.couriertracking.service;

import com.example.couriertracking.model.AddStoresRequest;
import com.example.couriertracking.model.Store;
import com.example.couriertracking.repository.StoreRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StoreServiceTest {

    @Mock
    StoreRepository storeRepository;

    @InjectMocks
    StoreService storeService;

    @Test
    void addStores() {
        var request = new AddStoresRequest(
                List.of(
                        new AddStoresRequest.StoreInfo("Armada Migros", 40.78, 29.14),
                        new AddStoresRequest.StoreInfo("Kolej Migros", 40.8, 29.15)
                )
        );

        var saved = List.of( new Store("Armada Migros", 40.78, 29.14),
                new Store("Kolej Migros", 40.8, 29.15)
        );
        when(storeRepository.saveAll(org.mockito.ArgumentMatchers.anyList()))
                .thenReturn(saved);

        List<Store> result = storeService.addStores(request);
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getName()).isEqualTo("Armada Migros");
        assertThat(result.get(1).getName()).isEqualTo("Kolej Migros");
        assertThat(result.get(1).getLat()).isEqualTo(40.8);

    }

}