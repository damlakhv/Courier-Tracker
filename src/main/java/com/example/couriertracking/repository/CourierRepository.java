package com.example.couriertracking.repository;

import com.example.couriertracking.model.Courier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourierRepository extends JpaRepository<Courier, Long> {}

