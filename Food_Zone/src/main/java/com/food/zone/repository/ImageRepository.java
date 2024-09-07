package com.food.zone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.food.zone.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{

	Optional<Image> findByName(String fileName);
	Image findByUserId(Long userId);
	List<Image> findByMenuItemId(Long menuId);
}
