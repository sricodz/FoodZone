package com.food.zone.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.food.zone.entity.FileData;
import com.food.zone.repository.MenuItemRepository;
import com.food.zone.services.FileStorageService;

@RestController
@RequestMapping("/api/files")
public class FileDataController {

	@Autowired
	private FileStorageService fileServ;
	
	@Autowired
	private MenuItemRepository menuRepo;
	
	@Value("${file.upload.dir}")
	private String uploadDir;
	
	@PostMapping("/upload/{menuId}")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable Long menuId){
		if(!menuRepo.existsById(menuId)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item Not Found");
		}
		FileData data = fileServ.storeFile(file, menuId);
		return ResponseEntity.ok("File Uploaded SuccessFully : "+file.getOriginalFilename());
	}
	
	@GetMapping("/file/{fileName}")
	public ResponseEntity<InputStreamResource> getFile(@PathVariable String fileName){
		byte[] fileBytes = fileServ.getFile(fileName);
		InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(fileBytes));
		return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE)
							.body(resource);
		
	}
	
	@GetMapping("/menuItems/{menuId}/files")
	public ResponseEntity<List<FileData>> getFilesByProduct(@PathVariable Long menuId){
		List<FileData> data = fileServ.getFileByProductId(menuId);
		return ResponseEntity.ok(data);
	}
	
	/*
	 * get the file by fileName return byteArrayResource
	 * **/
	
    @GetMapping("/path/{filename}")
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable String filename) throws IOException {
        Path path = Paths.get(uploadDir).resolve(filename);
        byte[] imageBytes = Files.readAllBytes(path);

        ByteArrayResource resource = new ByteArrayResource(imageBytes);
        MediaType mediaType = fileServ.getMediaType(filename); // You might need to implement this method

        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .body(resource);
    }
}
