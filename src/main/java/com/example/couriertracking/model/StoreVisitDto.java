package com.example.couriertracking.model;

import java.util.List;

public record StoreVisitDto(
        String courierName,
        int visitCount,
        List<String> stores
) { }

