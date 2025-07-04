package com.example.couriertracking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class StoreVisitLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime entryTime;

    @ManyToOne
    @JoinColumn(name = "courier_id")
    private Courier courier;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    public StoreVisitLog() {}

    public StoreVisitLog(Courier courier, Store store, LocalDateTime entryTime) {
        this.courier = courier;
        this.store = store;
        this.entryTime = entryTime;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public LocalDateTime getEntryTime() {return entryTime;}
    public void setEntryTime(LocalDateTime entryTime) {this.entryTime = entryTime;}

    public Courier getCourier() {return courier;}
    public void setCourier(Courier courier) {this.courier = courier;}

    public Store getStore() {return store;}
    public void setStore(Store store) {this.store = store;}
}
