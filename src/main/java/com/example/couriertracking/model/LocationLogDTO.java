package com.example.couriertracking.model;

import java.time.LocalDateTime;

public record LocationLogDTO(Double lat, Double lng, LocalDateTime timestamp) {}

