package com.example.couriertracking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class LocationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double lat;
    private double lng;

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "courier_id", nullable = false)
    private Courier courier;

    public LocationLog() {
    }

    public LocationLog(Double lat, Double lng, LocalDateTime timestamp, Courier courier) {
        this.lat = lat;
        this.lng = lng;
        this.timestamp = timestamp;
        this.courier = courier;
    }

    public Long getId() { return id; }

    public Double getLat() { return lat; }
    public void setLat(Double lat) { this.lat = lat; }
    public Double getLng() { return lng; }
    public void setLng(Double lng) { this.lng = lng; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public Courier getCourier() { return courier; }
    public void setCourier(Courier courier) { this.courier = courier; }

}
