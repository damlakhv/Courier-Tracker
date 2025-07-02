package com.example.couriertracking.service;

import com.example.couriertracking.model.AddCourierRequest;
import com.example.couriertracking.model.Courier;
import com.example.couriertracking.repository.CourierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourierService {

    private final CourierRepository courierRepository;

    @Autowired
    public CourierService(CourierRepository courierRepository) {
        this.courierRepository = courierRepository;
    }

    public Courier getCourier(Long id) {
       var optionalCourier= courierRepository.findById(id);
       return optionalCourier.orElse(null);
    }


    public Courier addCourier(AddCourierRequest request) {
        var courier = new Courier(request.name(), request.latitude(), request.longitude());
        return courierRepository.save(courier);
    }
}
