package com.food.zone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.food.zone.entity.MenuItem;
import com.food.zone.entity.Type;
import com.food.zone.entity.Category;


@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long>{

	Optional<MenuItem> findByName(String name);
	List<MenuItem> findByCategory(Category category);
	List<MenuItem> findByType(Type type);
	List<MenuItem> findByIsAvailable(boolean available);
	
}
