package com.food.zone.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.food.zone.entity.FileData;
import com.food.zone.entity.MenuItem;
import com.food.zone.repository.FileDataRepository;
import com.food.zone.repository.MenuItemRepository;

@Service
public class FileStorageService {

	@Value("${file.upload.dir}")
	private String uploadDir;
	
	@Autowired
	private FileDataRepository fileRepo;
	
	@Autowired
	private MenuItemRepository menuRepo;
	
	public void init() {
		try {
			Files.createDirectories(Paths.get(uploadDir));
		}catch (Exception e) {
			throw new RuntimeException("Could not initialize storage", e);
		}
	}
	
	public FileData storeFile(MultipartFile file, Long menuItemId) {
		String fileName = file.getOriginalFilename();
		try {
			Path path = Paths.get(uploadDir,fileName);
			Files.write(path, file.getBytes());
			
			MenuItem menu = menuRepo.findById(menuItemId).orElseThrow(()->new RuntimeException("Item Not found"));
			FileData data = new FileData();
			data.setName(fileName);
			data.setMenuItem(menu);
			return fileRepo.save(data);
		}catch (Exception e) {
			throw new RuntimeException("Failed to store file", e);
		}
	}
	
	public byte[] getFile(String fileName) {
		try {
			Path path = Paths.get(uploadDir,fileName);
			return Files.readAllBytes(path);
		}catch (Exception e) {
			 throw new RuntimeException("Failed to retrieve file", e);
		}
	}
	
	public List<FileData> getFileByProductId(Long id){
		return fileRepo.findByMenuItemId(id);
	}
	
    public MediaType getMediaType(String filename) {
        if (filename.endsWith(".png")) {
            return MediaType.IMAGE_PNG;
        } else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
            return MediaType.IMAGE_JPEG;
        } else if (filename.endsWith(".gif")) {
            return MediaType.IMAGE_GIF;
        } else {
            return MediaType.APPLICATION_OCTET_STREAM; // Default
        }
    }
	
}


