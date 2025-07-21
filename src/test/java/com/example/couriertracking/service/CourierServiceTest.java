package com.example.couriertracking.service;

import com.example.couriertracking.model.AddCourierRequest;
import com.example.couriertracking.model.Courier;
import com.example.couriertracking.repository.CourierRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CourierServiceTest {

    @Mock
    CourierRepository courierRepository;

    @InjectMocks
    CourierService courierService;

    @Test
    void addCourier_shouldSaveNewCourierAndReturnIt() {
        var request = new AddCourierRequest("Damla Kahya");

        var saved = new Courier("Damla Kahya");
        saved.setId(42L);
        when(courierRepository.save(argThat(c ->
                "Damla Kahya".equals(c.getName()) && c.getId() == null
        ))).thenReturn(saved);

        Courier result = courierService.addCourier(request);

        assertThat(result.getId()).isEqualTo(42L);
        assertThat(result.getName()).isEqualTo("Damla Kahya");
    }

}
