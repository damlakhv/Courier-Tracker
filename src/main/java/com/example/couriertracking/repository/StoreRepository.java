package com.example.couriertracking.repository;

import com.example.couriertracking.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
}
