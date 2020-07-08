package com.file_share.controller;

import com.file_share.controller.exception.ResourceNotFoundException;
import com.file_share.entity.Doc;
import com.file_share.repository.DocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FileShareController {

    @Autowired
    DocRepository docRepository;

    @PostMapping("/upload")
    public ResponseEntity<String> singleFileUpload(@RequestParam("file") MultipartFile file) throws IOException, ResourceNotFoundException{
        if(file.isEmpty()){
            throw new ResourceNotFoundException("no file uploaded.");
        }
        Doc doc = null;
        doc = new Doc(StringUtils.cleanPath(file.getOriginalFilename()),file.getBytes());
        docRepository.save(doc);
        return ResponseEntity.ok(doc.getKey());
    }


    @GetMapping("/download/{keyName}")
    public ResponseEntity singleFileDownload(@PathVariable String keyName) throws ResourceNotFoundException {

        Doc doc = docRepository.findById(keyName).orElseThrow(() -> new ResourceNotFoundException("file not found for key :: " + keyName));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFileName() + "\"")
                .body(doc.getFile());
    }
}
