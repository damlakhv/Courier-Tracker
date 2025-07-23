package com.example.couriertracking.model;

import java.util.List;

public record StoreVisitDTO(
        String courierName,
        int visitCount,
        List<String> stores
) { }

