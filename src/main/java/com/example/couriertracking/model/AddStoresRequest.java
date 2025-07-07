package com.example.couriertracking.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

import java.util.List;

public record AddStoresRequest(@NotEmpty List<@NotNull @Valid StoreInfo> storeInfos) {

    public record StoreInfo(@NotBlank String name,
                            @NotNull @Range(min = -90, max = 90) Double lat,
                            @NotNull @Range(min = -180, max = 180) Double lng) {

    }

}
