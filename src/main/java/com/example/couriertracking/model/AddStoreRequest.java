package com.example.couriertracking.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

public record AddStoreRequest(
        @NotBlank String name,
        @NotNull @Range(min = -90, max = 90) Double lat,
        @NotNull @Range(min = -180, max = 180) Double lng
) {}
