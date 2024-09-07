package com.food.zone.dto;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.food.zone.entity.Role;

import lombok.Builder;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class ProfileResponse {

	private Long id;
	private String name;
	private String email;
	private String gender;
	private Long phone;
	private String street;
	private String city;
	private String state;
	private Long pincode;
	private Long points;
	private Set<Role> roles;
	
}
