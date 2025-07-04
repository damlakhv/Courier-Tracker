package com.example.couriertracking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

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

    public LocationLog(double lat, double lng, LocalDateTime timestamp, Courier courier) {
        this.lat = lat;
        this.lng = lng;
        this.timestamp = timestamp;
        this.courier = courier;
    }

    public Long getId() { return id; }

    public double getLat() { return lat; }
    public void setLat(double lat) { this.lat = lat; }
    public double getLng() { return lng; }
    public void setLng(double lng) { this.lng = lng; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public Courier getCourier() { return courier; }
    public void setCourier(Courier courier) { this.courier = courier; }
}
