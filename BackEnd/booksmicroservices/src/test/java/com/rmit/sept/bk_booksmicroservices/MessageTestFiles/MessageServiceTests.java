package com.rmit.sept.bk_booksmicroservices.MessageTestFiles;

import com.rmit.sept.bk_booksmicroservices.Repositories.MessageRepository;
import com.rmit.sept.bk_booksmicroservices.Services.MessageService;
import com.rmit.sept.bk_booksmicroservices.model.Message;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class MessageServiceTests {

    private static Message message;

    @InjectMocks
    private MessageService messageService;

    @Mock
    private MessageRepository messageRepository;

    @BeforeEach
    void setup() {
        message = new Message();
        message.setUsername("user@user.com");
        message.setMessage("Hello World!");
    }

    @Test
    void saveOrUpdateMessageTest() {
        Mockito.when(messageRepository.save(message)).thenReturn(message);
        messageService.saveOrUpdateMessage(message);
        verify(messageRepository, times(1)).save(any(Message.class));
    }

}
