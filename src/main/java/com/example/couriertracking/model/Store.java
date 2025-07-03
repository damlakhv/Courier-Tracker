package com.example.couriertracking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "stores")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double lat;
    private Double lng;

    public Store() {}

    public Store(String name, Double lat, Double lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }

    public Long getId() {return id;}
    public String getName() {return name;}
    public Double getLat() {return lat;}
    public Double getLng() {return lng;}

    public void setId(Long id) {this.id = id;}
    public void setName(String name) {this.name = name;}
    public void setLat(Double lat) {this.lat = lat;}
    public void setLng(Double lng) {this.lng = lng;}
}
