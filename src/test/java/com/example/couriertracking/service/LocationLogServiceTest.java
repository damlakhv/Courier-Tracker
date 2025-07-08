package com.example.couriertracking.service;

import com.example.couriertracking.exception.CourierNotFoundException;
import com.example.couriertracking.model.AddLocationLogRequest;
import com.example.couriertracking.model.Courier;
import com.example.couriertracking.model.Store;
import com.example.couriertracking.model.StoreVisitLog;
import com.example.couriertracking.repository.CourierRepository;
import com.example.couriertracking.repository.LocationLogRepository;
import com.example.couriertracking.repository.StoreRepository;
import com.example.couriertracking.repository.StoreVisitLogRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LocationLogServiceTest {

    @Mock
    CourierRepository courierRepo;
    @Mock
    LocationLogRepository locationLogRepo;
    @Mock
    StoreRepository storeRepo;
    @Mock
    StoreVisitLogRepository visitLogRepo;

    @InjectMocks
    LocationLogService service;

    private final AddLocationLogRequest req =
            new AddLocationLogRequest(1L, 10.0, 20.0, LocalDateTime.now());

    @Test
    void addLocationLogWithoutCourier_throws() {
        when(courierRepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(CourierNotFoundException.class,
                () -> service.addLocationLog(req));

        verify(locationLogRepo, never()).save(any());
    }

    @Test
    void addLocationLogWithCourierAndNoNearbyStores() {
        when(courierRepo.findById(1L))
                .thenReturn(Optional.of(new Courier()));

        when(storeRepo.findNearbyStores(10.0, 20.0))
                .thenReturn(Collections.emptyList());

        when(visitLogRepo.findVisitedStoresAfter(any(), any(), eq(Collections.emptyList())))
                .thenReturn(Collections.emptyList());

        service.addLocationLog(req);

        verify(locationLogRepo, times(1)).save(any());
        verify(visitLogRepo, times(1))
                .findVisitedStoresAfter(any(), any(), eq(Collections.emptyList()));
        verify(visitLogRepo, never()).save(any());
    }

    @Test
    void addLocationLogWithNearbyStores_createsVisitLogs() {
        when(courierRepo.findById(1L))
                .thenReturn(Optional.of(new Courier()));

        Store storeA = new Store( "A", 0.0, 0.0);
        Store storeB = new Store( "B", 0.0, 0.0);
        List<Store> nearby = List.of(storeA, storeB);
        when(storeRepo.findNearbyStores(10.0, 20.0))
                .thenReturn(nearby);

        when(visitLogRepo.findVisitedStoresAfter(any(), any(), eq(nearby)))
                .thenReturn(Collections.emptyList());

        service.addLocationLog(req);

        verify(locationLogRepo, times(1)).save(any());
        verify(visitLogRepo, times(1))
                .findVisitedStoresAfter(any(), any(), eq(nearby));
        verify(visitLogRepo, times(2)).save(any(StoreVisitLog.class));
    }
}
