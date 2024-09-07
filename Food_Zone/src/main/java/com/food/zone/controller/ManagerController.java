package com.food.zone.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

	@GetMapping("/text")
	public String dummyContent() {
		return "From the Manager controller";
	}
	
}
