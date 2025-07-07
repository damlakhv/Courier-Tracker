package com.example.couriertracking.model;

import java.time.LocalDateTime;

public record LocationLogDto(Double lat, Double lng, LocalDateTime timestamp) {}

