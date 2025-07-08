package com.example.couriertracking.service;

import com.example.couriertracking.exception.CourierNotFoundException;
import com.example.couriertracking.model.AddLocationLogRequest;
import com.example.couriertracking.model.Courier;
import com.example.couriertracking.model.LocationLog;
import com.example.couriertracking.model.Store;
import com.example.couriertracking.model.StoreVisitLog;
import com.example.couriertracking.repository.CourierRepository;
import com.example.couriertracking.repository.LocationLogRepository;
import com.example.couriertracking.repository.StoreRepository;
import com.example.couriertracking.repository.StoreVisitLogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LocationLogServiceTest {

    @Mock private CourierRepository courierRepository;
    @Mock private LocationLogRepository locationLogRepository;
    @Mock private StoreRepository storeRepository;
    @Mock private StoreVisitLogRepository storeVisitLogRepository;

    @InjectMocks
    private LocationLogService service;

    private Courier courier;
    private LocalDateTime now;

    @BeforeEach
    void setUp() {
        now = LocalDateTime.of(2025, 7, 8, 10, 0);
        courier = new Courier();
        courier.setId(42L);
    }

    @Test
    void addLocationLog_savesBothLocationAndNewStoreVisit() {
        AddLocationLogRequest request = new AddLocationLogRequest(
                courier.getId(), 40.0, 30.0, now
        );

        when(courierRepository.findById(courier.getId()))
                .thenReturn(Optional.of(courier));

        Store s1 = new Store("Çankaya Migros", 40.0, 30.0);
        s1.setId(1L);
        Store s2 = new Store("Kurtuluş Migros", 40.1, 30.1);
        s2.setId(2L);

        when(storeRepository.findNearbyStores(40.0, 30.0))
                .thenReturn(List.of(s1, s2));

        when(storeVisitLogRepository.findVisitedStoresAfter(
                eq(courier),
                any(LocalDateTime.class),
                eq(List.of(s1, s2))
        )).thenReturn(List.of(s1));

        service.addLocationLog(request);

        ArgumentCaptor<LocationLog> locCaptor = ArgumentCaptor.forClass(LocationLog.class);
        verify(locationLogRepository, times(1)).save(locCaptor.capture());
        LocationLog savedLoc = locCaptor.getValue();
        assertEquals(courier,      savedLoc.getCourier());
        assertEquals(40.0,         savedLoc.getLat());
        assertEquals(30.0,         savedLoc.getLng());
        assertEquals(now,          savedLoc.getTimestamp());

        ArgumentCaptor<StoreVisitLog> visitCaptor = ArgumentCaptor.forClass(StoreVisitLog.class);
        verify(storeVisitLogRepository, times(1)).save(visitCaptor.capture());
        StoreVisitLog savedVisit = visitCaptor.getValue();
        assertEquals(courier,      savedVisit.getCourier());
        assertEquals(s2.getId(),   savedVisit.getStore().getId());
        assertEquals(now,          savedVisit.getEntryTime());
    }

    @Test
    void addLocationLog_unknownCourier_throwsException() {
        when(courierRepository.findById(anyLong()))
                .thenReturn(Optional.empty());

        AddLocationLogRequest badRequest = new AddLocationLogRequest(99L, 0.0, 0.0, now);

        assertThrows(CourierNotFoundException.class,
                () -> service.addLocationLog(badRequest));
    }
}
