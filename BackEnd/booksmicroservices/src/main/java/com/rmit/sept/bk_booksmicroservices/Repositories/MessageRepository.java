package com.rmit.sept.bk_booksmicroservices.Repositories;

import com.rmit.sept.bk_booksmicroservices.model.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long>
{
    Message getById(Long id);
    List<Message> findMessageByUsername(String username);
    
}
