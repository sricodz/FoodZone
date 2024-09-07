package com.food.zone.services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.food.zone.entity.Image;
import com.food.zone.entity.MenuItem;
import com.food.zone.entity.User;
import com.food.zone.repository.FileDataRepository;
import com.food.zone.repository.ImageRepository;
import com.food.zone.repository.MenuItemRepository;
import com.food.zone.repository.UserRepository;
import com.food.zone.security.JwtUtils;
import com.food.zone.utils.ImageUtils;

import jakarta.transaction.Transactional;

@Service
public class ImageService {
	
	@Autowired
	private ImageRepository imageRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private MenuItemRepository menuRepo;
	
	@Autowired
	private FileDataRepository fileRepo;
	
	@Autowired
	private JwtUtils jwt;
	
	
	public String uploadImageForProfile(MultipartFile file,String token) throws  java.io.IOException{
		String userName = jwt.extractUserName(token);
		User user = userRepo.findByEmail(userName).get();
		Image image = user!=null ? imageRepo.findByUserId(user.getId()) : null;
		Image img = null;
		if(image!=null) {
			image.setImageData(ImageUtils.compressImage(file.getBytes()));
			image.setType(file.getContentType());
			img = imageRepo.save(image);
		}
		else {
			img = imageRepo.save(Image.builder()
					.name(userName!=null ? userName : file.getOriginalFilename())
					.type(file.getContentType())
					.imageData(ImageUtils.compressImage(file.getBytes()))
					.user(user)
					.build()
				);
		}
		
		if(img!=null) {
			return "File Upload Successfully!";
		}
		return "Error uploading file!!";				
	}
	
	public String uploadImageForMenuItem(MultipartFile file,Long menuId) throws IOException {
		MenuItem item = menuRepo.findById(menuId).get();
		Image img = imageRepo.save(Image.builder()
							.name(file.getOriginalFilename())
							.imageData(ImageUtils.compressImage(file.getBytes()))
							.type(file.getContentType())
							.menuItem(item)
							.build()
						);
		if(img!=null) {
			return "File Upload Successfull";
		}
		
		return "Error uploading File";
	}
	
	public byte[] getImageByName(String fileName ) {
		Optional<Image> img = imageRepo.findByName(fileName);
		byte[] imgArray = ImageUtils.decompressImage(img.get().getImageData());
		return imgArray;
	}
	
	@Transactional
	public byte[] getMenuItemImagesAsZip(Long menuId)throws IOException{
		List<Image> img = imageRepo.findByMenuItemId(menuId);
		try (
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			ZipOutputStream zos = new ZipOutputStream(baos)){
			for(Image image : img) {
				ZipEntry zip = new ZipEntry(image.getName());
				zos.setComment(image.getName());
				zos.putNextEntry(zip);
				zos.write(image.getImageData());
				zos.closeEntry();
			}
			zos.finish();
			return baos.toByteArray();
		}
	}
	
	 
}
