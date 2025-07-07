package com.example.couriertracking.model;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record AddLocationLogRequest(
        @NotNull Long courierId,
        @NotNull Double lat,
        @NotNull Double lng,
        @NotNull LocalDateTime timestamp
) {}
