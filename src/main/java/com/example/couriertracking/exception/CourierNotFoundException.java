package com.example.couriertracking.exception;

public class CourierNotFoundException extends RuntimeException {
  public CourierNotFoundException(Long courierId) {
    super("Courier with id " + courierId + " not found");
  }
}
