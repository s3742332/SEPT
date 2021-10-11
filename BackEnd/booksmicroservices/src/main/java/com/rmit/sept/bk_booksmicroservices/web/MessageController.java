package com.rmit.sept.bk_booksmicroservices.web;

import com.rmit.sept.bk_booksmicroservices.Repositories.MessageRepository;
import com.rmit.sept.bk_booksmicroservices.Services.MessageService;
import com.rmit.sept.bk_booksmicroservices.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/messages")
public class MessageController
{

    @Autowired
    private MessageService messageService;

    @Autowired
    private MessageRepository messageRepository;

    @CrossOrigin(origins = "*")
    @PostMapping("/saveMessage")
    public ResponseEntity<Message> createNewMessage(@Valid @RequestBody Message message)
    {
        messageService.saveOrUpdateMessage(message);
        return new ResponseEntity<Message>(message, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getMessages")
    public ResponseEntity<?> getAllMessages()
    {
        Iterable<Message> messages = messageRepository.findAll();
        return new ResponseEntity<Iterable<Message>>(messages, HttpStatus.OK);
    }
}
