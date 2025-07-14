package com.example.couriertracking.service;

import com.example.couriertracking.exception.CourierNotFoundException;
import com.example.couriertracking.model.AddCourierRequest;
import com.example.couriertracking.model.Courier;
import com.example.couriertracking.repository.CourierRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CourierService {

    private final CourierRepository courierRepository;

    public CourierService(CourierRepository courierRepository) {
        this.courierRepository = courierRepository;
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

    public void deleteCourierById(Long id) {
        if (!courierRepository.existsById(id)) {
            throw new CourierNotFoundException(id);
        }
        courierRepository.deleteById(id);
    }
    public Courier updateCourier(Long id, String newName) {
        Courier c = courierRepository.findById(id)
                .orElseThrow(() -> new CourierNotFoundException(id));
        c.setName(newName);
        return courierRepository.save(c);
    }

}
