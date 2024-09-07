package com.food.zone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.food.zone.entity.Ratings;

@Repository
public interface RatingsRepository extends JpaRepository<Ratings, Long>{

	List<Ratings> findByMenuItemId(Long id);
	List<Ratings> findByUserId(Long id);
	@Query("Select r from Ratings r where r.user.id= :userId AND r.menuItem.id=:menuItemId")
	Ratings findByUserIdAndMenuItemId(@Param("userId") long userId,@Param("menuItemId") long menuItemId);
}
