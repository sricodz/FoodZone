package com.food.zone.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.zone.dto.RatingDto;
import com.food.zone.entity.MenuItem;
import com.food.zone.entity.Ratings;
import com.food.zone.entity.User;
import com.food.zone.repository.MenuItemRepository;
import com.food.zone.repository.RatingsRepository;
import com.food.zone.repository.UserRepository;

@Service
public class RatingService {

	@Autowired
	private RatingsRepository ratingRepo;
	
	@Autowired
	private MenuItemRepository menuItemRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	public Ratings saveRating(RatingDto rating,Long userId,Long menuItemId) {
		
		Ratings existRating = getRatingsByUserAndMenuItemId(userId, menuItemId);
		Ratings r = new Ratings();
		User user = new User();
		MenuItem menuItem = new MenuItem();
		if(existRating == null) {
			user =	userRepo.findById(userId).get();
			menuItem = menuItemRepo.findById(menuItemId).get();
			r.setUser(user);
			r.setMenuItem(menuItem);
			r.setRate(rating.getRate());
			r.setReview(rating.getComment());
			return ratingRepo.save(r);
		}
		
		existRating.setRate(rating.getRate());
		existRating.setReview(rating.getComment());
		
		return ratingRepo.save(existRating);
		
	}
	
	public List<Ratings> getAllRatings(){
		return ratingRepo.findAll();
	}
	
	public List<Ratings> getRatingsByMenuItem(Long id){
		return ratingRepo.findByMenuItemId(id);
	}
	
	public List<Ratings> getRatingByUser(Long id){
		return ratingRepo.findByUserId(id);
	}
	
	public Ratings getRatingById(Long id) {
		return ratingRepo.findById(id).get();
	}
	
	public Ratings getRatingsByUserAndMenuItemId(long userId,long menuItemId) {
		return ratingRepo.findByUserIdAndMenuItemId(userId, menuItemId);
	}
	
	public Ratings updateRating(Long ratingId,RatingDto dto) {
		Ratings r = new Ratings();
		r.setReview(dto.getComment());
		r.setRate(dto.getRate());
		r.setId(ratingId);
		return ratingRepo.save(r);
	}
	
}
