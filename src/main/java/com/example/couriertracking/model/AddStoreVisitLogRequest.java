package com.example.couriertracking.model;

import jakarta.validation.constraints.NotNull;

public record AddStoreVisitLogRequest(
        @NotNull Long courierId,
        @NotNull Long storeId
) {}
