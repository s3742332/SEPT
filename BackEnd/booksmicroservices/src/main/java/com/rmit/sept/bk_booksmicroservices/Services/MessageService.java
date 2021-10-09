package com.rmit.sept.bk_booksmicroservices.Services;

import com.rmit.sept.bk_booksmicroservices.model.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.rmit.sept.bk_booksmicroservices.Repositories.MessageRepository;

public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Transactional
    public void saveOrUpdateMessage(Message message) {
        try {
            messageRepository.save(message);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

}
