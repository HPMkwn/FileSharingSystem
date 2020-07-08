package com.file_share.repository;

import com.file_share.entity.Doc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocRepository extends JpaRepository<Doc,String> {
    @Query(value="SELECT * FROM Doc d WHERE d.time_stamp<=NOW()-INTERVAL 10 MINUTE",
            nativeQuery = true)
    List<Doc> getOldDocs();
}
