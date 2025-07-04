package com.example.couriertracking.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

public record AddCourierRequest(@NotBlank String name){

}
