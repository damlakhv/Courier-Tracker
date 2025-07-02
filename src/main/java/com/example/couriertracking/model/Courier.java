package com.example.couriertracking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "couriers")
public class Courier {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)

        private Long id;

        private String name;
        private Double latitude;
        private Double longitude;

        public Courier() {}

        public Courier(String name, Double latitude, Double longitude) {
                this.name = name;
                this.latitude = latitude;
                this.longitude = longitude;
        }

        public Long getId() { return id; }
        public String getName() { return name; }
        public Double getLatitude() { return latitude; }
        public Double getLongitude() { return longitude; }

        public void setName(String name) { this.name = name; }
        public void setLatitude(Double latitude) { this.latitude = latitude; }
        public void setLongitude(Double longitude) { this.longitude = longitude; }
}
