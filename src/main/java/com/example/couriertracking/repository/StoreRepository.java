package com.example.couriertracking.repository;

import com.example.couriertracking.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {

    @Query(value = """
    SELECT * FROM stores 
    WHERE ST_Distance_Sphere(POINT(:lng, :lat), POINT(lng, lat)) < 100
    """, nativeQuery = true)
    List<Store> findNearbyStores(@Param("lat") double lat, @Param("lng") double lng);

    @Query(value = """
    SELECT ST_Distance_Sphere(POINT(:lng1, :lat1), POINT(:lng2, :lat2))
    """, nativeQuery = true)
    Double calculateDistance(
            @Param("lat1") double lat1,
            @Param("lng1") double lng1,
            @Param("lat2") double lat2,
            @Param("lng2") double lng2
    );



}
