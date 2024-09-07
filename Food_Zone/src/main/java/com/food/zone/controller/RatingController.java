package com.food.zone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.food.zone.dto.RatingDto;
import com.food.zone.entity.Ratings;
import com.food.zone.services.RatingService;

@RestController
public class RatingController {

	@Autowired
	private RatingService rateServ;
	
	@PostMapping("/api/rating/add/{menuItemId}/{userId}")
	public ResponseEntity<Ratings> addRatings(@RequestBody RatingDto dto,@PathVariable Long menuItemId,@PathVariable Long userId){
		return new ResponseEntity(rateServ.saveRating(dto, userId, menuItemId), HttpStatus.CREATED);
	}
	
	@GetMapping("/v1/rating/menuItem/{menuItemId}")
	public ResponseEntity<List<Ratings>> getByMenuItem(@PathVariable Long menuItemId){
		return new ResponseEntity(rateServ.getRatingsByMenuItem(menuItemId), HttpStatus.OK);
	}
	
	@GetMapping("/api/rating/user/{userId}")
	public ResponseEntity<List<Ratings>> getByUserId(@PathVariable Long userId){
		return new ResponseEntity(rateServ.getRatingByUser(userId), HttpStatus.OK);
	}
	
	@GetMapping("/api/rating/user/{userId}/menuItem/{menuItemId}")
	public ResponseEntity<Ratings> getByUserIdAndMenuItemId(@PathVariable long userId,@PathVariable long menuItemId){
		return new ResponseEntity(rateServ.getRatingsByUserAndMenuItemId(userId, menuItemId), HttpStatus.OK);
	}
	
	@GetMapping("/api/rating/all")
	public ResponseEntity<List<Ratings>> getAllRatinsg(){
		return new ResponseEntity(rateServ.getAllRatings(), HttpStatus.OK);
	}
	
	@GetMapping("/api/rating/{rateId}")
	public ResponseEntity<Ratings> getRatingById(@PathVariable Long id){
		return new ResponseEntity(rateServ.getRatingById(id), HttpStatus.OK);
	}
	
	@PutMapping("/api/rating/update/{rateId}")
	public ResponseEntity<List<Ratings>> updateRating(@RequestBody RatingDto dto,@PathVariable Long rateId){
		return new ResponseEntity(rateServ.updateRating(rateId, dto), HttpStatus.OK);
	}
}
