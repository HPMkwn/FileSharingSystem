package com.file_share.Scheduling;

import com.file_share.repository.DocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class JobSchedulingBean {

    @Autowired
    DocRepository docRepository;

    private final static Logger logger = Logger.getLogger("data-import scheduling job");

    @Scheduled(cron = "0,30 * * * * *")
    public void cronJob() {

        logger.info("Job ran.");
        docRepository.deleteInBatch(docRepository.getOldDocs());

    }
}
