package com.food.zone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.zone.dto.MenuItemRequest;
import com.food.zone.entity.Category;
import com.food.zone.entity.MenuItem;
import com.food.zone.entity.Type;
import com.food.zone.services.MenuItemService;

@RestController
public class MenuItemController {

	@Autowired
	private MenuItemService menuItemServ;
	
	@PostMapping("v1/item/add")
	public ResponseEntity<MenuItem> saveMenuItem(@RequestBody MenuItemRequest req){
		return new ResponseEntity<MenuItem>(menuItemServ.addMenuItem(req), HttpStatus.CREATED);
	}
	
	@GetMapping("/v1/menuItem/name/{name}")
	public ResponseEntity<MenuItem> getByName(@PathVariable String name){
		return new ResponseEntity<MenuItem>(menuItemServ.getItemByName(name), HttpStatus.OK);
	}
	
	@GetMapping("/v1/menuItem/id/{id}")
	public ResponseEntity<MenuItem> getById(@PathVariable Long id){
		return new ResponseEntity<MenuItem>(menuItemServ.getItemById(id), HttpStatus.OK);
	}
	
	@GetMapping("/v1/menuItem/category/{category}")
	public ResponseEntity<List<MenuItem>> getByCategory(@PathVariable Category category){
		return new ResponseEntity<List<MenuItem>>(menuItemServ.getItemsByCategory(category), HttpStatus.OK);
	}
	
	@GetMapping("/v1/menuItem/type/{type}")
	public ResponseEntity<List<MenuItem>> getByType(@PathVariable Type type){
		return new ResponseEntity<List<MenuItem>>(menuItemServ.getItemsByType(type), HttpStatus.OK);
	}
	
	@GetMapping("v1/item/available/{available}")
	public ResponseEntity<List<MenuItem>> getByIsAvailable(@PathVariable boolean available){
		return new ResponseEntity<List<MenuItem>>(menuItemServ.getItemsByIsAvailable(available), HttpStatus.OK);
	}
	
	@GetMapping("/v1/menuItem/all")
	public ResponseEntity<List<MenuItem>> getAllItems(){
		return new ResponseEntity<List<MenuItem>>(menuItemServ.getAllItems(), HttpStatus.OK);
	}
	
	@PutMapping("v1/item/update/{id}")
	public ResponseEntity<MenuItem> updateItem(@RequestBody MenuItemRequest req,@PathVariable Long id){
		return new ResponseEntity<MenuItem>(menuItemServ.updateItem(req,id ), HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("v1/item/del/{id}")
	public ResponseEntity<String> deleteById(@PathVariable Long id){
		menuItemServ.deleteItemById(id);
		return new ResponseEntity<String>("Item Deleted!!", HttpStatus.OK);
	}
}
