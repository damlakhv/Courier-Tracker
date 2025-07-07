package com.example.couriertracking.model;

import jakarta.validation.constraints.NotBlank;

public record AddCourierRequest(@NotBlank String name){
}
