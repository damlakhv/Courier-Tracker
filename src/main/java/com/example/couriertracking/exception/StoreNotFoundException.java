package com.example.couriertracking.exception;

public class StoreNotFoundException extends RuntimeException {
  public StoreNotFoundException(Long storeId) {
    super("Store with id " + storeId + " not found");
  }
}
