package com.example.couriertracking.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "couriers")
public class Courier {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        public Courier() {}

        public Courier(String name) {this.name = name;}

        public Long getId() {return id;}
        public String getName() {return name;}
        public void setId(Long id) {this.id = id;}
        public void setName(String name) {this.name = name;}

    @OneToMany(mappedBy = "courier", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<LocationLog> locationLogs = new ArrayList<>();

    @OneToMany(mappedBy = "courier", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<StoreVisitLog> storeVisitLogs = new ArrayList<>();


}
