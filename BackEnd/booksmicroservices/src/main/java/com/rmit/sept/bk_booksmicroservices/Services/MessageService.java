package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.Repositories.MessageRepository;
import com.rmit.sept.bk_booksmicroservices.model.Message;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MessageService {

    private static final Logger logger = LogManager.getLogger(MessageService.class);

    @Autowired
    private MessageRepository messageRepository;

    @Transactional
    public void saveOrUpdateMessage(Message message) {
        try {
            messageRepository.save(message);
        } catch (Exception e) {
            logger.log(Level.ERROR, "Unable to save message");
            System.out.println(e);
        }
    }

}
