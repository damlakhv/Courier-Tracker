package com.example.couriertracking.model;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record AddLocationLogRequest(
        @NotNull Long courierId,
        @NotNull double lat,
        @NotNull double lng,
        @NotNull LocalDateTime timestamp
) {}
