package com.food.zone.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AddressRequest {

	private String street;
	
	@NotNull(message = "City shouldn't be null")
	private String city;
	
	private String state;
	
	@NotNull(message = "Pincode shouldn't be null")
	private Long pincode;
}
