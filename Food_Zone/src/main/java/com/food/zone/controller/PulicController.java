package com.food.zone.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/public")
public class PulicController {

	@GetMapping("/text")
	public String dummyContent() {
		return "From the PUblic  controller method-1";
	}
	
	@GetMapping("/content")
	public String dummyContent2() {
		return "From the PUblic  controller method-2 dude ...!";
	}
}
