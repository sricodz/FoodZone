package com.food.zone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.food.zone.entity.FileData;

public interface FileDataRepository extends JpaRepository<FileData, Long>{

	Optional<FileData> findByName(String fileName);
	List<FileData> findByMenuItemId(Long Id);
}
