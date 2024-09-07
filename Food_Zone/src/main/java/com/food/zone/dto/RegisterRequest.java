package com.food.zone.dto;


import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RegisterRequest {

	@NotBlank(message = "Name Shouldn't be blank")
	@NotNull(message = "Name Shouldn't be null")
	private String name;
	
	@NotBlank(message = "Email Shouldn't be blank")
	@NotNull
	@Email(message = "Invalid Email Address")
	private String email;
	
	@NotBlank(message = "Password Shouldn't be blank")
	@NotNull(message = "Password Shouldn't be null")
	private String password;
	
	@NotBlank(message = "Phone Shouldn't be blank")
	private Long phone;
	
	@NotNull(message = "Gender Shouldn't be null")
	private String gender;
	
	private AddressRequest addressRequest;
	
}
