package com.file_share.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Random;

@Entity
public class Doc {

    @Id
    private String key;
    private String fileName;
    @Lob
    private byte[] file;
    private Timestamp time_stamp;

    public Doc(){}
    public Doc(String fileName, byte[] file) {
        this.key = generateRandomKey();
        this.fileName = fileName;
        this.file = file;

        Date date=new Date();
        Timestamp ts=new Timestamp(date.getTime());
        this.time_stamp =ts;
    }


    static public String generateRandomKey() {
        int leftLimit = 48;
        int rightLimit = 122;
        int targetStringLength = 12;
        Random random = new Random();
        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        return generatedString;
    }

    public String getKey() {
        return key;
    }

    public byte[] getFile() {
        return file;
    }

    public String getFileName() {
        return fileName;
    }
}
