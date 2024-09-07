package com.food.zone.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.zone.dto.MenuItemRequest;
import com.food.zone.entity.Category;
import com.food.zone.entity.FileData;
import com.food.zone.entity.MenuItem;
import com.food.zone.entity.Type;
import com.food.zone.repository.MenuItemRepository;

@Service
public class MenuItemService {

	@Autowired
	private MenuItemRepository menuItemRepo;
	
	public MenuItem addMenuItem(MenuItemRequest req) {
		return menuItemRepo.save(mapToMenuItem(req));
	}
	public MenuItem getItemById(Long id) {
		return menuItemRepo.findById(id).get();
	}
	public MenuItem getItemByName(String name) {
		return menuItemRepo.findByName(name).get();
	}
	
	public List<MenuItem> getItemsByCategory(Category category){
		return menuItemRepo.findByCategory(category);
	}
	
	public List<MenuItem> getItemsByType(Type type){
		return menuItemRepo.findByType(type);
	}
	
	public List<MenuItem> getItemsByIsAvailable(boolean isAvailable){
		return menuItemRepo.findByIsAvailable(isAvailable);
	}
	
	public void deleteItemById(Long id) {
		menuItemRepo.deleteById(id);
	}
	
	public MenuItem updateItem(MenuItemRequest req,Long id) {
		MenuItem item = mapToMenuItem(req);
		item.setId(id);
		List<FileData> data = new ArrayList<>();
		item.setFileData(data);
		return menuItemRepo.save(item);
	}
	
	public List<MenuItem> getAllItems(){
		return menuItemRepo.findAll();
	}
	
	public MenuItem mapToMenuItem(MenuItemRequest req) {
		MenuItem item = new MenuItem();
		item.setAvailable(req.isAvailable());
		item.setCategory(req.getCategory());
		item.setDescription(req.getDescription());
		item.setName(req.getName());
		item.setPrice(req.getPrice());
		item.setType(req.getType());
		return item;
	}
}
