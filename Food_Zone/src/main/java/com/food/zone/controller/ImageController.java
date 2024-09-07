package com.food.zone.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.food.zone.services.ImageService;
import com.food.zone.utils.AuthUtils;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/v1/image")
public class ImageController {

	@Autowired
	private ImageService imgServ;
	
	@Autowired
	private AuthUtils utils;
	
	
	/**
	 * The below api is to upload images for profile
	 * */	
	@PostMapping("/profile")
	public ResponseEntity<?> uploadImageForUser(@RequestParam("image") MultipartFile file,HttpServletRequest req) throws IOException{
		String token = utils.fetchTokenFromRequest(req);
		String img = imgServ.uploadImageForProfile(file,token);
		return ResponseEntity.status(HttpStatus.OK).body(img);
	}
	
	/**
	 * The below api is to upload images for menuItems
	 * */	
	@PostMapping("/menuItem/{menuId}")
	public ResponseEntity<?> uploadImageForMenuItem(@RequestParam("image") MultipartFile file,@PathVariable Long menuId) throws IOException{
		String img = imgServ.uploadImageForMenuItem(file, menuId);
		return ResponseEntity.status(HttpStatus.OK).body(img);
	}
	
	@GetMapping("/name/{fileName}")
	public ResponseEntity<?> getImageByName(@PathVariable String fileName){
		byte[] img = imgServ.getImageByName(fileName);
		return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(img);
	}
	
	@GetMapping("/menuItems/{menuId}")
	public ResponseEntity<byte[]> getImageByMenuItem(@PathVariable Long menuId){
		System.out.println("Inside the getImageBYMenuitem !! and id is :: "+menuId);
		try {
			byte[] zipData = imgServ.getMenuItemImagesAsZip(menuId);
			HttpHeaders headers = new HttpHeaders();
			headers.add(headers.CONTENT_DISPOSITION,"attachment; filename=menu_item_images.zip");
			headers.add(headers.CONTENT_TYPE, "application/zip");
			return new ResponseEntity<byte[]>(zipData,headers, HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
