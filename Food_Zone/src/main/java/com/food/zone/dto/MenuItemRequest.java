package com.food.zone.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.food.zone.entity.Category;
import com.food.zone.entity.Type;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MenuItemRequest {

	private String name;
	private double price;
	private boolean isAvailable;
	private Category category;
	private Type type;
	private String description;
}
