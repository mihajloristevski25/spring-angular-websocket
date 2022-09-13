package com.mihajlopoc.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {
    @Autowired
    WebsocketService websocketService;

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/sendMessage")
    @SendTo("/topic/getMessage")
    public Greeting greet(HelloMessage message){
        return websocketService.hello(message);
    }

    @Scheduled(fixedRate = 5000)
    public void send() {
        simpMessagingTemplate.convertAndSend("/topic/getMessage",new Greeting("Mario"));
    }

}
