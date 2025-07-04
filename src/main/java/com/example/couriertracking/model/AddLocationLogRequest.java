package com.example.couriertracking.model;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

//We might have to make it a list to take multiple requests...
public record AddLocationLogRequest(
        @NotNull Long courierId,
        @NotNull double lat,
        @NotNull double lng,
        @NotNull LocalDateTime timestamp
) {}
