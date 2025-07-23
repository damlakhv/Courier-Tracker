package com.example.couriertracking.service;

import com.example.couriertracking.exception.CourierNotFoundException;
import com.example.couriertracking.model.AddCourierRequest;
import com.example.couriertracking.model.Courier;
import com.example.couriertracking.repository.CourierRepository;
import com.example.couriertracking.repository.LocationLogRepository;
import com.example.couriertracking.repository.StoreVisitLogRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CourierService {

    private final CourierRepository courierRepository;
    private final StoreVisitLogRepository storeVisitLogRepository;
    private final LocationLogRepository locationLogRepository;

    public CourierService(CourierRepository courierRepository, StoreVisitLogRepository storeVisitLogRepository, LocationLogRepository locationLogRepository) {
        this.courierRepository = courierRepository;
        this.storeVisitLogRepository = storeVisitLogRepository;
        this.locationLogRepository = locationLogRepository;
    }

    public Courier getCourier(Long id) {
       var optionalCourier= courierRepository.findById(id);
       return optionalCourier.orElse(null);
    }

    public Courier addCourier(AddCourierRequest request) {
        Courier courier = new Courier(request.name());
        return courierRepository.save(courier);
    }

    public List<Courier> getAllCouriers() {
        return courierRepository.findAll();
    }

    @Transactional
    public void deleteCourierById(Long id) {
        Courier courier = courierRepository.findById(id)
                .orElseThrow(() -> new CourierNotFoundException(id));

        courierRepository.delete(courier);
    }

    public Courier updateCourier(Long id, String newName) {
        Courier c = courierRepository.findById(id)
                .orElseThrow(() -> new CourierNotFoundException(id));
        c.setName(newName);
        return courierRepository.save(c);
    }

}
